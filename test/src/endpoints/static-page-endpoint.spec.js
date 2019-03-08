const getStaticPageV1 = require('../../../src/endpoints/static-page-endpoint')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const staticPageResponse = require('../../fixtures/staticpage-response')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getStaticPagesV1', () => {
  test('endpoint returns a static page', () => {
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