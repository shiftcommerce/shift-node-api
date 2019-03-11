const { getProductV1 } = require('../../../src/endpoints/product-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const productResponse = require('../../fixtures/product-response-payload')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getProductV1', () => {
  it('returns a product when given a correct id', () => {
    const queryObject = {
      include: 'asset_files,variants,bundles,bundles.asset_files,template,meta.*',
      fields: { asset_files: 'image_height,image_width,s3_url' }
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/products/172`)
      .query(queryObject)
      .reply(200, productResponse)

    return getProductV1(172, queryObject)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(productResponse)
      })
  })

  it('returns an error with incorrect id', () => {
    const queryObject = {
      include: 'asset_files,variants,bundles,bundles.asset_files,template,meta.*',
      fields: { asset_files: 'image_height,image_width,s3_url' }
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/products/20000`)
      .query(queryObject)
      .reply(404, {
        'errors': [
          {
            'title': 'Record not found',
            'detail': 'The record identified by 20000 could not be found.',
            'code': '404',
            'status': '404'
          }
        ],
        'meta': {
          'facets': []
        }
      })

    expect.assertions(2)

    return getProductV1(20000, queryObject)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 404'))
        expect(error.response.data.errors[0].title).toEqual('Record not found')
      })
  })
})