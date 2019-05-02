const { createAssetsFilesV1, createProductAssetFilesV1 } = require('../../../src/endpoints/asset-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const newImportResponse = require('../../fixtures/import-response-payload') // functions under test return an import
const createAssetsRequest = require('../../fixtures/create-assets-request')
const createProductAssetsRequest = require('../../fixtures/create-product-assets-request')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => {
  nock.cleanAll()
})

describe('createAssetFilesV1', () => {
  test('creates an import for a set of asset files', () => {
    let request = {}

    nock(shiftApiConfig.get().apiHost)
      .post(`/${shiftApiConfig.get().apiTenant}/v1/asset_files`)
      .query(true)
      .reply(function (uri, requestBody) {
        request = requestBody
        return [ 201, newImportResponse ]
      })

    const assets = [
      {
        name: 'foo',
        reference: 'img_foo',
        remote_file_url: 'http://example.com/some/path/to/a/file.jpg',
        folder: {
          name: 'my folder',
          reference: 'my_folder'
        }
      },
      {
        name: 'foo2',
        reference: 'img_foo2',
        remote_file_url: 'http://example.com/some/path/to/a/different_file.jpg'
      }
    ]

    return createAssetsFilesV1(assets)
      .then(response => {
        expect(JSON.parse(request)).toEqual(createAssetsRequest)
        expect(response.status).toEqual(201)
        expect(response.data).toEqual(newImportResponse)
      })
  })
})

describe('createProductAssetFiles', () => {
  test('creates an import for a set of mappings between products and asset files', () => {
    let request = {}

    nock(shiftApiConfig.get().apiHost)
      .post(`/${shiftApiConfig.get().apiTenant}/v1/product_asset_files`)
      .query(true)
      .reply(function (uri, requestBody) {
        request = requestBody
        return [ 201, newImportResponse ]
      })

    const mappings = [
      {
        product_reference: 'foo',
        asset_file_reference: 'img_foo'
      },
      {
        product_reference: 'bar',
        asset_file_reference: 'img_bar',
        position: 0
      },
      {
        product_reference: 'foo',
        asset_file_reference: 'img_bar',
        position: 1

      },
      {
        product_reference: 'bar',
        asset_file_reference: 'img_bar2',
        position: 1
      }
    ]

    return createProductAssetFilesV1(mappings)
      .then(response => {
        expect(JSON.parse(request)).toEqual(createProductAssetsRequest)
        expect(response.status).toEqual(201)
        expect(response.data).toEqual(newImportResponse)
      })
  })
})
