const { createOrderV1 } = require('../../../src/endpoints/order-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const createOrderResponse = require('../../fixtures/create-order-response')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('createOrderV1', () => {
  test('creates an order with valid data', () => {
    const body = {
      data: {
        type: 'create_order',
        attributes: {
          billing_address: {},
          channel: 'web',
          currency: 'GBP',
          email: 'guest@order.com',
          ip_address: '1.1.1.1',
          line_items_resources: [],
          shipping_address: {},
          shipping_method: {},
          discount_summaries: [],
          sub_total: 19.45,
          total: 19.45,
          placed_at: '2018-10-31T14:37:34.113Z',
          payment_transactions_resources: []
        }
      }
    }

    nock(shiftApiConfig.get().apiHost)
      .post(`/${shiftApiConfig.get().apiTenant}/v2/create_order`, body)
      .query(true)
      .reply(201, createOrderResponse)

    return createOrderV1(body)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual(createOrderResponse)
      })
  })
})
