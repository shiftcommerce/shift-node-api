const { getImportV1 } = require('../../../src/endpoints/import-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const importResponse = require('../../fixtures/import-response-payload')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getImportV1', () => {
  test('returns an import when given a correct id', () => {
    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/imports/101`)
      .reply(200, importResponse)

    expect.assertions(2)

    return getImportV1(101)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(importResponse)
      })
  })

  test('returns an error with incorrect id', () => {
    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/imports/102`)
      .reply(404, {
        'errors': [
          {
            'title': 'Record not found',
            'detail': 'The record identified by 102 could not be found.',
            'code': '404',
            'status': '404'
          }
        ],
        'meta': {
          'facets': []
        }
      })

    expect.assertions(2)

    return getImportV1(102)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 404'))
        expect(error.response.data.errors[0].title).toEqual('Record not found')
      })
  })

})
