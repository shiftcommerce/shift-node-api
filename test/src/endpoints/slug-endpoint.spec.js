const getSlugDataV1 = require('../../../src/endpoints/slug-endpoint')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const slugResponse = require('../../fixtures/slug-response')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getSlugDataV1', () => {
  test('endpoint returns a slug', () => {
    const queryObject = {
      filter: {
        path: 'coffee'
      },
      page: {
        number: 1,
        size: 1
      },
      fields: {
        slugs: 'resource_type,resource_id,active,slug'
      }
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/slugs`)
      .query(true)
      .reply(200, slugResponse)

    return getSlugDataV1(queryObject)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(slugResponse)
      })
  })

  test('endpoint errors with incorrect data and returns console.log', () => {
    const queryObject = {
      filter: {
        path: 'incorrectslug'
      },
      page: {
        size: ''
      },
      fields: {
        slugs: 'resource_type,resource_id,active,slug'
      }
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/slugs`)
      .query(queryObject)
      .reply(500)

    expect.assertions(1)

    return getSlugDataV1(queryObject)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 500'))
      })
  })
})