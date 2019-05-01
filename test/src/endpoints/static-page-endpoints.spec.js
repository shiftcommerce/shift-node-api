const { getStaticPageV1, getArticleStaticPageV1 } = require('../../../src/endpoints/static-page-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

const parser = require('../../../src/lib/json-api-parser')

// Fixtures
const staticPageResponse = require('../../fixtures/staticpage-response')
const articleStaticPageResponse = require('../../fixtures/article-staticpage-response')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getStaticPagesV1', () => {
  test('endpoint returns a static page with correct id', () => {
    const queryObject = {
      include: 'template,meta.*'
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/static_pages/56`)
      .query(queryObject)
      .reply(200, staticPageResponse)

    return getStaticPageV1(56, queryObject)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(staticPageResponse)
      })
  })

  test('endpoint returns an error with incorrect id', () => {
    const queryObject = {
      include: 'template,meta.*'
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/static_pages/1001`)
      .query(queryObject)
      .reply(404, {
        errors: [
          {
            title: 'Record not found',
            detail: 'The record identified by 1001 could not be found.',
            code: '404',
            status: '404'
          }
        ],
        links: {
          self: '/reference/v1/static_pages/1001?include=template,meta.*'
        }
      })

    return getStaticPageV1(1001, queryObject)
      .catch(error => {
        expect(error.response.status).toBe(404)
        expect(error.response.data.errors[0].title).toEqual('Record not found')
      })
  })
})

describe('getArticleStaticPageV1', () => {
  test('returns a static page with articles', () => {
    const queryObject = {
      filter: {
        filter: {
          and: [
            {
              id: {
                gt: '7'
              }
            },
            {
              static_page_folder_id: {
                eq: '1'
              }
            },
            {
              published: {
                eq: 'true'
              }
            }
          ]
        }
      },
      page: {
        size: 1
      }
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/static_pages`)
      .query(queryObject)
      .reply(200, articleStaticPageResponse)

    return getArticleStaticPageV1(queryObject)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(articleStaticPageResponse)
      })
  })
})