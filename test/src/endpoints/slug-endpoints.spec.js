const { getResourceBySlugV1 } = require('../../../src/endpoints/slug-endpoints')
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

describe('getResourceBySlugV1', () => {
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

    return getResourceBySlugV1(queryObject)
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

    return getResourceBySlugV1(queryObject)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 500'))
      })
  })
})