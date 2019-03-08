const SHIFTClient = require('../../src/shift-client')
const nock = require('nock')
const { shiftApiConfig } = require('../../src/index')

// Fixtures
const menuResponse = require('../fixtures/menu-response-payload')
const menuResponseParsed = require('../fixtures/menu-response-payload-parsed')
const cartResponse = require('../fixtures/new-cart-response')
const cartResponseParsed = require('../fixtures/new-cart-response-parsed')
const staticPageResponse = require('../fixtures/staticpage-response')
const staticPageResponseParsed = require('../fixtures/staticpage-response-parsed')
const slugResponse = require('../fixtures/slug-response')
const slugResponseParsed = require('../fixtures/slug-response-parsed')
const categoryResponse = require('../fixtures/category-response')
const categoryResponseParsed = require('../fixtures/category-response-parsed')
const registerResponse = require('../fixtures/register-response')
const register422response = require('../fixtures/register-422-response')
const loginResponse = require('../fixtures/login-response')
const customerOrdersResponse = require('../fixtures/customer-orders-response')
const addressBookResponse = require('../fixtures/addressbook-response')
const addressBookResponseParsed = require('../fixtures/addressbook-response-parsed')
const productResponse = require('../fixtures/product-response-payload')
const productResponseParsed = require('../fixtures/product-response-parsed')
const createAddressBookResponse = require('../fixtures/create-addressbook-response')
const createAddressBookResponseParsed = require('../fixtures/create-addressbook-response-parsed')

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('SHIFTClient', () => {
  it('getMenusV1() should return a parsed response', () => {
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

    return SHIFTClient.getMenusV1(query)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(menuResponseParsed)
      })
  })

  it('getCartV1() should return a parsed response', () => {
    const cartId = '35'

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/carts/35`)
      .reply(200, cartResponse)

    return SHIFTClient.getCartV1(cartId)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(cartResponseParsed)
      })
  })

  it('addLineItemToCartV1() should add lineitem to existing cart then call getCartV1()', () => {
    const cartId = '35'
    const req = {
      body: {
        variantId: '100',
        quantity: 3
      }
    }

    nock(shiftApiConfig.get().apiHost)
      .post(`/${shiftApiConfig.get().apiTenant}/v1/carts/35/line_items`)
      .reply(200)

    const getCartNock = nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/carts/35`)
      .reply(200, cartResponse)

    return SHIFTClient.addLineItemToCartV1(req, {}, cartId)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(cartResponseParsed)
        expect(getCartNock.isDone()).toEqual(true)
      })
  })

  it('createNewCartWithLineItemV1() should create a new cart with LineItem then assigns cart to customer if customer id is present', () => {
    const req = {
      signedCookies: {},
      session: {
        customerId: '123'
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

    const createCartRequest = nock(shiftApiConfig.get().apiHost)
      .post(`/${shiftApiConfig.get().apiTenant}/v1/carts`)
      .reply(201, { data: { id: '3' } })

    const updateCartRequest = nock(shiftApiConfig.get().apiHost)
      .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/3`)
      .reply(200, { data: { id: '3' } })

    return SHIFTClient.createNewCartWithLineItemV1(req, res)
      .then((response, res) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ id: '3' })
        expect(createCartRequest.isDone()).toEqual(true)
        expect(updateCartRequest.isDone()).toEqual(true)
      })
  })

  it('assignCartToCustomerV1() assigns cart to customer then returns a parsed response', () => {
    const cartId = '35'
    const customerId = '1'

    nock(shiftApiConfig.get().apiHost)
      .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
      .reply(200, { data: { id: '3' } })

    return SHIFTClient.assignCartToCustomerV1(cartId, customerId)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ id: '3' })
      })
  })

  it('deleteLineItemV1() updates lineItem quantity to existing cart, then calls getCartV1()', () => {
    const cartId = '14'
    const lineItemId = '1'

    const deleteLineItemMock = nock(shiftApiConfig.get().apiHost)
      .delete(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}/line_items/${lineItemId}`)
      .reply(201)

    // nock the get request after the post has finished

    const getCartNock = nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
      .reply(200, { cart: 'cart_data' })

    return SHIFTClient.deleteLineItemV1(lineItemId, cartId)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ cart: 'cart_data' })
        expect(deleteLineItemMock.isDone()).toEqual(true)
        expect(getCartNock.isDone()).toEqual(true)
      })
  })

  it('updateLineItemV1() updates lineItem quantity to existing cart, then calls getCart()', () => {
    const cartId = '14'
    const lineItemId = '1'
    const newQuantity = 2

    const updateLineItemMock = nock(shiftApiConfig.get().apiHost)
      .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}/line_items/${lineItemId}`)
      .reply(201)

    const getCartNock = nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
      .reply(200, { cart: 'cart_data' })

    return SHIFTClient.updateLineItemV1(newQuantity, cartId, lineItemId)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ cart: 'cart_data' })
        expect(updateLineItemMock.isDone()).toEqual(true)
        expect(getCartNock.isDone()).toEqual(true)
      })
  })

  it('addCartCouponV1() adds a coupon to cart when coupon code is valid then returns a parsed response', () => {
    const cartId = '17'
    const couponCode = 'ABC-DISCOUNT-XYZ'

    nock(shiftApiConfig.get().apiHost)
      .post(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}/coupons`)
      .reply(201, { coupon: 'coupon_data' })

    return SHIFTClient.addCartCouponV1(couponCode, cartId)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual({ coupon: 'coupon_data' })
      })
  })

  it('setCartShippingMethodV1() updates the cart with a shipping address id', () => {
    const cartId = '14'
    const shippingMethodId = '12'

    const updateCartMock = nock(process.env.API_HOST)
      .patch(`/${process.env.API_TENANT}/v1/carts/${cartId}`)
      .reply(200, { cart: 'updated_cart_data' })

    return SHIFTClient.setCartShippingMethodV1(cartId, shippingMethodId)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ cart: 'updated_cart_data' })
        expect(updateCartMock.isDone()).toBe(true)
      })
  })

  it.only('getShippingMethodsV1() should return a parsed response', () => {
    return SHIFTClient.getShippingMethodsV1()
  })

  it('createCustomerAddressV1() should return a parsed response', () => {
    return SHIFTClient.createCustomerAddressV1()
  })

  it('setCartBillingAddressV1() should return a parsed response', () => {
    return SHIFTClient.setCartBillingAddressV1()
  })

  it('setCartShippingAddressV1() should return a parsed response', () => {
    return SHIFTClient.setCartShippingAddressV1()
  })

  it('getSlugDataV1() should return a parsed response', () => {
    return SHIFTClient.getSlugDataV1()
  })

  it('getProductByIdV1() should return a parsed response', () => {
    return SHIFTClient.getProductByIdV1()
  })

  it('getStaticPageV1() should return a parsed response', () => {
    return SHIFTClient.getStaticPageV1()
  })

  it('getCategoryByIdV1() should return a parsed response', () => {
    return SHIFTClient.getCategoryByIdV1()
  })

  it('getAccountV1() should return a parsed response', () => {
    return SHIFTClient.getAccountV1()
  })

  it('createCustomerAccountV1() should return a parsed response', () => {
    return SHIFTClient.createCustomerAccountV1()
  })

  it('loginCustomerAccountV1() should return a parsed response', () => {
    return SHIFTClient.loginCustomerAccountV1()
  })

  it('getCustomerOrdersV1() should return a parsed response', () => {
    return SHIFTClient.getCustomerOrdersV1()
  })

  it('getAddressBookV1() should return a parsed response', () => {
    return SHIFTClient.getAddressBookV1()
  })

  it('createAddressBookEntryV1() should return a parsed response', () => {
    return SHIFTClient.createAddressBookEntryV1()
  })

  it('deleteAddressV1() should return a parsed response', () => {
    return SHIFTClient.deleteAddressV1()
  })
})
