const { getMenusV1 } = require('../../../src/endpoints/menu-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const menuResponse = require('../../fixtures/menu-response-payload')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getMenusV1', () => {
  it('returns a correct response with a valid query', () => {
    const query = {
      fields: {
        menu_items: 'title,slug,menu_items,item,background_image_link,background_image,published,canonical_path,meta_attributes',
        menus: 'title,reference,updated_at,menu_items'
      },
      filter: {
        filter: {
          reference: {
            eq: 'mega-menu'
          }
        }
      },
      include: 'menu_items'
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/menus`)
      .query(true)
      .reply(200, menuResponse)

    return getMenusV1(query)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(menuResponse)
      })
  })

  it('returns an error when called with an invalid query', () => {
    const query = {
      fields: {
        menu_items: 'title,slug,menu_items,item,background_image_link,background_image,published,canonical_path,meta_attributes',
        menus: 'title,reference,updated_at,menu_items'
      },
      filter: {
        filter: {
          reference: {
            e: 'mega-menu'
          }
        }
      },
      include: 'menu_items'
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/menus`)
      .query(true)
      .reply(500)

    return getMenusV1(query)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 500'))
      })
  })
})