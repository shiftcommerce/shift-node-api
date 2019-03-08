const { getCategoryByIdV1 } = require('../../../src/endpoints/category-endpoint')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const categoryResponse = require('../../fixtures/category-response')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getCategoryByIdV1', () => {
  it('returns a category when given a correct id', () => {
    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/category_trees/reference:web/categories/56`)
      .reply(200, categoryResponse)

    return getCategoryByIdV1(56)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(categoryResponse)
      })
  })

  it('endpoint errors with incorrect id and returns console.log', () => {
    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/category_trees/reference:web/categories/1`)
      .reply(404, {
        errors: [
          {
            title: 'Record not found',
            detail: 'The record identified by 1 could not be found.',
            code: '404',
            status: '404'
          }
        ],
        links: {
          self: '/reference/v1/category_trees/reference:web/categories/1'
        }
      })

    expect.assertions(3)

    return getCategoryByIdV1(1)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 404'))
        expect(error.response.data.errors[0].title).toEqual('Record not found')
        expect(error.response.data.errors[0].detail).toEqual('The record identified by 1 could not be found.')
      })
  })
})