const { getCartV1,
  addLineItemToCartV1,
  createNewCartWithLineItemV1,
  assignCartToCustomerV1,
  deleteLineItemV1,
  updateLineItemV1,
  addCartCouponV1,
  setCartShippingMethodV1,
  getShippingMethodsV1,
  createCustomerAddressV1,
  setCartBillingAddressV1,
  setCartShippingAddressV1 } = require('../../../src/endpoints/cart-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const cartResponse = require('../../fixtures/new-cart-response')
const cartResponseParsed = require('../../fixtures/new-cart-response-parsed')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getCartV1', () => {
  test('fetches cart from the api', () => {
    const queryObject = {
      include: 'line_items.item.product,line_items.line_item_discounts,discount_summaries,customer_account,billing_address,shipping_address,shipping_method'
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/carts/10132`)
      .query(queryObject)
      .reply(200, cartResponse)


    return getCartV1(cartId, queryObject)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(cartResponseParsed)
      })
  })
})

describe('createNewCartWithLineItemV1', () => {
  test('creates a new cart with LineItem', () => {
    const req = {
      signedCookies: {},
      session: {
        customerId: null
      },
      body: {
        variantId: '100',
        quantity: 4
      }
    }

    const res = {
      status: jest.fn(x => ({
        send: {}
      })),
      cookie: jest.fn()
    }

    nock(shiftApiConfig.get().apiHost)
      .post(`/${shiftApiConfig.get().apiTenant}/v1/carts`)
      .reply(201, cartResponse)

    return createNewCartWithLineItemV1(req, res)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual(cartResponse)
      })
  })
})

describe('addLineItemToCartV1', () => {
  test('adds lineItem to existing cart', () => {
    const cartId = '14'
    const req = {
      body: {
        variantId: '100',
        quantity: 4
      }
    }

    const addLineItemMock = nock(shiftApiConfig.get().apiHost)
      .post(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}/line_items`)
      .reply(201, { cart: 'cart_data' })

    return addLineItemToCartV1(req, {}, cartId)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual({ cart: 'cart_data' })
        expect(addLineItemMock.isDone()).toBe(true)
      })
  })
})

describe('assignCartToCustomerV1', () => {
  test('assigns cart to customer', () => {
    const cartId = '14'
    const req = {
      session: {
        customerId: '123'
      },
      body: {
        variantId: '100',
        quantity: 4
      }
    }

    nock(shiftApiConfig.get().apiHost)
      .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
      .reply(201, { cart: 'cart_data' })

    return assignCartToCustomerV1(cartId, req.session.customerId)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual({ cart: 'cart_data' })
      })
  })
})

describe('updateLineItemV1', () => {
  test('updates lineItem quantity to existing cart', () => {
    const cartId = '14'
    const lineItemId = '1'
    const newQuantity = 2

    const updateLineItemMock = nock(shiftApiConfig.get().apiHost)
      .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}/line_items/${lineItemId}`)
      .reply(201)

    return updateLineItemV1(newQuantity, cartId, lineItemId)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(updateLineItemMock.isDone()).toBe(true)
      })
  })
})

describe('deleteLineItemV1', () => {
  test('updates lineItem quantity to existing cart', () => {
    const cartId = '14'
    const lineItemId = '1'
    const newQuantity = 2

    const updateLineItemMock = nock(shiftApiConfig.get().apiHost)
      .delete(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}/line_items/${lineItemId}`)
      .reply(201)

    return deleteLineItemV1(lineItemId, cartId)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(updateLineItemMock.isDone()).toBe(true)
      })
  })
})

describe('setCartShippingMethodV1', () => {
  test('updates the cart with a shipping address id', () => {
    const cartId = '14'
    const shippingMethodId = '12'

    const updateCartMock = nock(shiftApiConfig.get().apiHost)
      .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
      .reply(200, { cart: 'updated_cart_data' })

    return setCartShippingMethodV1(cartId, shippingMethodId)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ cart: 'updated_cart_data' })
        expect(updateCartMock.isDone()).toBe(true)
      })
  })
})

describe('getShippingMethodsV1', () => {
  test('returns shipping methods', () => {
    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/shipping_methods`)
      .reply(201, { shipping_methods: 'shipping_methods_data' })

    return getShippingMethodsV1()
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual({ shipping_methods: 'shipping_methods_data' })
      })
  })
})

describe('createCustomerAddressV1', () => {
  test('creates a new address', () => {
    const req = {
      body: {
        first_name: 'First name',
        last_name: 'Last name',
        line_1: 'Address line 1',
        line_2: 'Address line 2',
        city: 'City',
        country_code: 'Country code',
        zipcode: 'Zipcode'
      }
    }

    nock(shiftApiConfig.get().apiHost)
      .post(`/${shiftApiConfig.get().apiTenant}/v1/addresses`)
      .reply(201, { address: 'new_address_data' })

    return createCustomerAddressV1(req)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual({ address: 'new_address_data' })
      })
  })
})

describe('setCartShippingAddressV1', () => {
  test('updates the cart with a shipping address id', () => {
    const cartId = '35'
    const addressId = '12'

    nock(shiftApiConfig.get().apiHost)
      .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
      .reply(200, { cart: 'updated_cart_data' })

    return setCartShippingAddressV1(addressId, cartId)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ cart: 'updated_cart_data' })
      })
  })
})

describe('setCartBillingAddressV1', () => {
  test('updates the cart with a billing address id', () => {
    const cartId = '35'
    const addressId = '12'

    nock(shiftApiConfig.get().apiHost)
      .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
      .reply(200, { cart: 'updated_cart_data' })

    return setCartBillingAddressV1(addressId, cartId)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ cart: 'updated_cart_data' })
      })
  })
})

describe('addCartCouponV1', () => {
  test('adds a coupon to cart when coupon code is valid', () => {
    const cartId = '17'
    const couponCode = 'ABC-DISCOUNT-XYZ'

    nock(shiftApiConfig.get().apiHost)
      .post(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}/coupons`)
      .reply(201, { coupon: 'coupon_data' })

    return addCartCouponV1(couponCode, cartId)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual({ coupon: 'coupon_data' })
      })
  })
})