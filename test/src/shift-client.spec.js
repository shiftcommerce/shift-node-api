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
const articleStaticPageResponse = require('../fixtures/article-staticpage-response')
const articleStaticPageResponseParsed = require('../fixtures/article-staticpage-response-parsed')
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
const getAccountByEmailResponse = require('../fixtures/account-by-email-response')
const getAccountByEmailResponseParsed = require('../fixtures/account-by-email-response-parsed')
const createPasswordRecoveryResponse = require('../fixtures/create-password-recovery-response')
const createPasswordRecoveryResponseParsed = require('../fixtures/create-password-recovery-response-parsed')
const createPasswordRecoveryError = require('../fixtures/create-password-recovery-error')
const getAccountByTokenResponse = require('../fixtures/account-by-token-response')
const getAccountByTokenResponseParsed = require('../fixtures/account-by-token-response-parsed')
const createOrderResponse = require('../fixtures/create-order-response')
const createOrderResponseParsed = require('../fixtures/create-order-response-parsed')

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('SHIFTClient', () => {
  describe('getMenusV1()', () => {
    test('should return a parsed response', () => {
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
  })

  describe('getCartV1()', () => {
    test('should return a parsed response', () => {
      const queryObject = {
        include: 'line_items.item.product,line_items.line_item_discounts,discount_summaries,customer_account,billing_address,shipping_address,shipping_method'
      }
      const cartId = '35'

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
        .query(queryObject)
        .reply(200, cartResponse)

      return SHIFTClient.getCartV1(cartId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(cartResponseParsed)
        })
    })
  })

  describe('addLineItemToCartV1()', () => {
    test('should add lineitem to existing cart then call getCartV1()', () => {
      const queryObject = {
        include: 'line_items.item.product,line_items.line_item_discounts,discount_summaries,customer_account,billing_address,shipping_address,shipping_method'
      }
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
        .get(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
        .query(queryObject)
        .reply(200, cartResponse)

      return SHIFTClient.addLineItemToCartV1(req, {}, cartId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(cartResponseParsed)
          expect(getCartNock.isDone()).toEqual(true)
        })
    })
  })

  describe('createNewCartWithLineItemV1()', () => {
    test('should create a new cart with LineItem then assigns cart to customer if customer id is present', () => {
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
  })

  describe('assignCartToCustomerV1()', () => {
    test('assigns cart to customer then returns a parsed response', () => {
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
  })

  describe('deleteLineItemV1()', () => {
    test('updates lineItem quantity to existing cart, then calls getCartV1()', () => {
      const queryObject = {
        include: 'line_items.item.product,line_items.line_item_discounts,discount_summaries,customer_account,billing_address,shipping_address,shipping_method'
      }
      const cartId = '14'
      const lineItemId = '1'

      const deleteLineItemMock = nock(shiftApiConfig.get().apiHost)
        .delete(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}/line_items/${lineItemId}`)
        .reply(201)

      // nock the get request after the post has finished

      const getCartNock = nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
        .query(queryObject)
        .reply(200, { cart: 'cart_data' })

      return SHIFTClient.deleteLineItemV1(lineItemId, cartId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'cart_data' })
          expect(deleteLineItemMock.isDone()).toEqual(true)
          expect(getCartNock.isDone()).toEqual(true)
        })
    })
  })

  describe('updateLineItemV1()', () => {
    test('updates lineItem quantity to existing cart, then calls getCart()', () => {
      const queryObject = {
        include: 'line_items.item.product,line_items.line_item_discounts,discount_summaries,customer_account,billing_address,shipping_address,shipping_method'
      }
      const cartId = '14'
      const lineItemId = '1'
      const newQuantity = 2

      const updateLineItemMock = nock(shiftApiConfig.get().apiHost)
        .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}/line_items/${lineItemId}`)
        .reply(201)

      const getCartNock = nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
        .query(queryObject)
        .reply(200, { cart: 'cart_data' })

      return SHIFTClient.updateLineItemV1(newQuantity, cartId, lineItemId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'cart_data' })
          expect(updateLineItemMock.isDone()).toEqual(true)
          expect(getCartNock.isDone()).toEqual(true)
        })
    })
  })

  describe('addCartCouponV1()', () => {
    test('adds a coupon to cart when coupon code is valid then returns a parsed response', () => {
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
  })

  describe('setCartShippingMethodV1()', () => {
    test('updates the cart with a shipping address id', () => {
      const cartId = '14'
      const shippingMethodId = '12'

      const updateCartMock = nock(shiftApiConfig.get().apiHost)
        .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
        .reply(200, { cart: 'updated_cart_data' })

      return SHIFTClient.setCartShippingMethodV1(cartId, shippingMethodId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'updated_cart_data' })
          expect(updateCartMock.isDone()).toBe(true)
        })
    })
  })

  describe('getShippingMethodsV1()', () => {
    test('returns shipping methods', () => {
      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/shipping_methods`)
        .reply(201, { shipping_methods: 'shipping_methods_data' })

      return SHIFTClient.getShippingMethodsV1()
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual({ shipping_methods: 'shipping_methods_data' })
        })
    })
  })

  describe('createCustomerAddressV1()', () => {
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

      return SHIFTClient.createCustomerAddressV1(req)
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual({ address: 'new_address_data' })
        })
    })
  })

  describe('setCartBillingAddressV1()', () => {
    test('should return a parsed response', () => {
      const cartId = '35'
      const addressId = '12'

      nock(shiftApiConfig.get().apiHost)
        .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
        .reply(200, { cart: 'updated_cart_data' })

      return SHIFTClient.setCartBillingAddressV1(addressId, cartId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'updated_cart_data' })
        })
    })
  })

  describe('setCartShippingAddressV1()', () => {
    test('should return a parsed response', () => {
      const cartId = '35'
      const addressId = '12'

      nock(shiftApiConfig.get().apiHost)
        .patch(`/${shiftApiConfig.get().apiTenant}/v1/carts/${cartId}`)
        .reply(200, { cart: 'updated_cart_data' })

      return SHIFTClient.setCartShippingAddressV1(addressId, cartId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'updated_cart_data' })
        })
    })
  })

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

      return SHIFTClient.getResourceBySlugV1(queryObject)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(slugResponseParsed)
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

      return SHIFTClient.getResourceBySlugV1(queryObject)
        .catch(error => {
          expect(error).toEqual(new Error('Request failed with status code 500'))
        })
    })
  })

  describe('getProductV1', () => {
    test('returns a product when given a correct id', () => {
      const queryObject = {
        include: 'asset_files,variants,bundles,bundles.asset_files,template,meta.*',
        fields: { asset_files: 'image_height,image_width,s3_url' }
      }

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/products/172`)
        .query(queryObject)
        .reply(200, productResponse)

      return SHIFTClient.getProductV1(172, queryObject)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(productResponseParsed)
        })
    })

    test('returns an error with incorrect id', () => {
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

      return SHIFTClient.getProductV1(20000, queryObject)
        .catch(error => {
          expect(error).toEqual(new Error('Request failed with status code 404'))
          expect(error.response.data.errors[0].title).toEqual('Record not found')
        })
    })
  })

  describe('getStaticPagesV1', () => {
    test('endpoint returns a static page', () => {
      const queryObject = {
        include: 'template,meta.*'
      }

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/static_pages/56`)
        .query(queryObject)
        .reply(200, staticPageResponse)

      return SHIFTClient.getStaticPageV1(56, queryObject)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(staticPageResponseParsed)
        })
    })

    test('endpoint returns an error with incorrect id', () => {
      const queryObject = {
        include: 'template,meta.*'
      }

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/static_pages/1001`)
        .query(queryObject)
        .reply(404, {
          errors: [
            {
              title: 'Record not found',
              detail: 'The record identified by 1001 could not be found.',
              code: '404',
              status: '404'
            }
          ],
          links: {
            self: '/reference/v1/static_pages/1001?include=template,meta.*'
          }
        })

      return SHIFTClient.getStaticPageV1(1001, queryObject)
        .catch(error => {
          expect(error.response.status).toBe(404)
          expect(error.response.data.errors[0].title).toEqual('Record not found')
        })
    })
  })

  describe('getArticleStaticPageV1', () => {
    test('endpoint returns a static page with articles', () => {
      const queryObject = {
        filter: {
          filter: {
            and: [
              {
                id: {
                  gt: '7'
                }
              },
              {
                static_page_folder_id: {
                  eq: '1'
                }
              },
              {
                published: {
                  eq: 'true'
                }
              }
            ]
          }
        },
        page: {
          size: 1
        }
      }

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/static_pages`)
        .query(queryObject)
        .reply(200, articleStaticPageResponse)
      
      return SHIFTClient.getArticleStaticPageV1(queryObject)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(articleStaticPageResponseParsed)
        })
    })
  })

  describe('getCategoryV1', () => {
    test('returns a category when given a correct id', () => {
      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/category_trees/reference:web/categories/56`)
        .reply(200, categoryResponse)

      return SHIFTClient.getCategoryV1(56)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(categoryResponseParsed)
        })
    })

    test('endpoint errors with incorrect id and returns console.log', () => {
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

      return SHIFTClient.getCategoryV1(1)
        .catch(error => {
          expect(error).toEqual(new Error('Request failed with status code 404'))
          expect(error.response.data.errors[0].title).toEqual('Record not found')
          expect(error.response.data.errors[0].detail).toEqual('The record identified by 1 could not be found.')
        })
    })
  })

  describe('getAccountV1', () => {
    test('gets an account if there is a customer id', () => {
      const customerId = 10
      const queryObject = {
        fields: {
          customer_accounts: 'email,meta_attributes'
        },
        include: ''
      }

      const accountData = {
        id: '10',
        attributes: {
          key: 'value'
        }
      }

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/${customerId}`)
        .query(true)
        .reply(200, accountData)

      return SHIFTClient.getAccountV1(queryObject, customerId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(accountData)
        })
    })
  })

  describe('createCustomerAccountV1', () => {
    test('allows you to create an account with a correct payload', () => {
      const body = {
        'data': {
          'type': 'customer_accounts',
          'attributes': {
            'email': 'testing1234@example.com',
            'email_confirmation': 'testing1234@example.com',
            'password': 'Testing1234',
            'first_name': 'Testing',
            'last_name': '1234'
          }
        }
      }

      nock(shiftApiConfig.get().apiHost)
        .post(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts`)
        .reply(201, registerResponse)

      return SHIFTClient.createCustomerAccountV1(body)
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual(registerResponse)
        })
    })

    test('errors if account already exists', () => {
      const body = {
        data: {
          type: 'customer_accounts',
          attributes: {
            email: 'testing1234@example.com',
            email_confirmation: 'testing1234@example.com',
            password: 'Testing1234',
            first_name: 'Testing',
            last_name: '1234'
          }
        }
      }

      nock(shiftApiConfig.get().apiHost)
        .post(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts`)
        .reply(422, register422response)

      expect.assertions(3)

      return SHIFTClient.createCustomerAccountV1(body)
        .catch(error => {
          expect(error).toEqual(new Error('Request failed with status code 422'))
          expect(error.response.data.errors[0].title).toEqual('has already been taken')
          expect(error.response.data.errors[0].detail).toEqual('email - has already been taken')
        })
    })
  })

  describe('loginCustomerAccountV1', () => {
    test('allows you to login to an account with a correct payload', () => {
      const body = {
        data: {
          type: 'customer_account_authentications',
          attributes: {
            email: 'testing1234@example.com',
            password: 'qwertyuiop'
          }
        }
      }

      nock(shiftApiConfig.get().apiHost)
        .post(`/${shiftApiConfig.get().apiTenant}/v1/customer_account_authentications`)
        .reply(201, loginResponse)

      return SHIFTClient.loginCustomerAccountV1(body)
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual(loginResponse)
        })
    })

    test('errors if account doesnt exist', () => {
      const body = {
        data: {
          type: 'customer_account_authentications',
          attributes: {
            email: 'iamwrong@example.com',
            password: 'qwertyuiop'
          }
        }
      }

      nock(shiftApiConfig.get().apiHost)
        .post(`/${shiftApiConfig.get().apiTenant}/v1/customer_account_authentications`)
        .reply(404, {
          errors: [
            {
              title: 'Record not found',
              detail: 'Wrong email/reference/token or password',
              code: '404',
              status: '404'
            }
          ],
          links: {
            self: '/reference/v1/customer_account_authentications'
          }
        })

      expect.assertions(3)

      return SHIFTClient.loginCustomerAccountV1(body)
        .catch(error => {
          expect(error).toEqual(new Error('Request failed with status code 404'))
          expect(error.response.data.errors[0].title).toEqual('Record not found')
          expect(error.response.data.errors[0].detail).toEqual('Wrong email/reference/token or password')
        })
    })
  })

  describe('getCustomerOrdersV1', () => {
    test('gets customer orders from oms', () => {
      const query = {
        filter: {
          account_reference: shiftApiConfig.get().apiTenant,
          customer_reference: '123456'
        },
        fields: {
          customer_orders: 'account_reference,reference,placed_at,line_items,pricing,shipping_methods,shipping_addresses,discounts',
          line_items: 'quantity,sku,pricing,shipping_method,shipping_address,discounts',
          shipping_methods: 'label,price',
          shipping_addresses: 'name,company,lines,city,state,postcode,country',
          discounts: 'label,amount_inc_tax,coupon_code'
        },
        include: 'customer,shipping_methods,shipping_addresses,discounts,line_items,line_items.shipping_method,line_items.shipping_address,line_items.discounts'
      }

      nock('https://shift-oms-dev.herokuapp.com')
        .get('/oms/v1/customer_orders/')
        .query(true)
        .reply(200, customerOrdersResponse)

      return SHIFTClient.getCustomerOrdersV1(query)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(customerOrdersResponse)
        })
    })

    test('should return errors if no customer_reference is present', () => {
      const query = {
        fields: {
          customer_orders: 'account_reference,reference,placed_at,line_items,pricing,shipping_methods,shipping_addresses,discounts',
          line_items: 'quantity,sku,pricing,shipping_method,shipping_address,discounts',
          shipping_methods: 'label,price',
          shipping_addresses: 'name,company,lines,city,state,postcode,country',
          discounts: 'label,amount_inc_tax,coupon_code'
        },
        include: 'customer,shipping_methods,shipping_addresses,discounts,line_items,line_items.shipping_method,line_items.shipping_address,line_items.discounts'
      }

      nock('https://shift-oms-dev.herokuapp.com')
        .get('/oms/v1/customer_orders/')
        .query(true)
        .reply(422, {
          errors: [
            {
              status: '422',
              detail: 'No filter[customer_reference] specified'
            }
          ]
        })

      expect.assertions(2)

      return SHIFTClient.getCustomerOrdersV1(query)
        .catch(error => {
          expect(error.response.status).toEqual(422)
          expect(error.response.data.errors[0].detail).toEqual('No filter[customer_reference] specified')
        })
    })
  })

  describe('getAddressBookV1', () => {
    test('endpoint returns address book with correct id', () => {
      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/77/addresses`)
        .reply(200, addressBookResponse)

      return SHIFTClient.getAddressBookV1(77)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(addressBookResponseParsed)
        })
    })

    test('endpoint returns an empty array with an id that has no addresses or is invalid', () => {
      const addressBookWrongIdResponse = {
        'data': [],
        'meta': {
          'total_entries': 0,
          'page_count': 0
        },
        'links': {
          'self': '/reference/v1/customer_accounts/123123123/addresses',
          'first': '/reference/v1/addresses.json_api?page%5Bnumber%5D=1&page%5Bsize%5D=25',
          'last': '/reference/v1/addresses.json_api?page%5Bnumber%5D=1&page%5Bsize%5D=25'
        }
      }

      const addressBookWrongIdResponseParsed = {
        data: [],
        pagination:
        {
          total_entries: 0,
          page_count: 0,
          self: '/reference/v1/customer_accounts/123123123/addresses',
          first:
            '/reference/v1/addresses.json_api?page%5Bnumber%5D=1&page%5Bsize%5D=25',
          last:
            '/reference/v1/addresses.json_api?page%5Bnumber%5D=1&page%5Bsize%5D=25'
        }
      }

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/123123123/addresses`)
        .reply(200, addressBookWrongIdResponse)

      return SHIFTClient.getAddressBookV1(123123123)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(addressBookWrongIdResponseParsed)
        })
    })
  })

  describe('createAddressBookEntryV1', () => {
    test('saves an address to the address book', () => {
      const body = {
        'id': '45',
        'type': 'addresses',
        'attributes': {
          'meta_attributes': {
            'label': {
              'value': 'Paw address',
              'data_type': 'text'
            },
            'phone_number': {
              'value': '07123456789',
              'data_type': 'text'
            },
            'email': {
              'value': 'testaccount@example.com',
              'data_type': 'text'
            }
          },
          'customer_account_id': 77,
          'first_name': 'Test',
          'last_name': 'Testing',
          'middle_names': '',
          'address_line_1': '123 Fakeroad',
          'address_line_2': '',
          'address_line_3': '',
          'city': 'Fakefield',
          'state': null,
          'postcode': 'WF4 4KE',
          'country': 'GB',
          'preferred_shipping': false,
          'preferred_billing': false
        }
      }

      nock(shiftApiConfig.get().apiHost)
        .post(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/77/addresses`)
        .reply(201, createAddressBookResponse)

      return SHIFTClient.createAddressBookEntryV1(body, 77)
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual(createAddressBookResponseParsed)
        })
    })

    test('returns an error with a missing field', () => {
      const body = {
        'id': '45',
        'type': 'addresses',
        'attributes': {
          'meta_attributes': {
            'label': {
              'value': 'Paw address',
              'data_type': 'text'
            },
            'phone_number': {
              'value': '07123456789',
              'data_type': 'text'
            },
            'email': {
              'value': 'testaccount@example.com',
              'data_type': 'text'
            }
          },
          'customer_account_id': 77,
          'first_name': '',
          'last_name': 'Testing',
          'middle_names': '',
          'address_line_1': '123 Fakeroad',
          'address_line_2': '',
          'address_line_3': '',
          'city': 'Fakefield',
          'state': null,
          'postcode': 'WF4 4KE',
          'country': 'GB',
          'preferred_shipping': false,
          'preferred_billing': false
        }
      }

      nock(shiftApiConfig.get().apiHost)
        .post(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/77/addresses`)
        .reply(422, {
          'errors': [
            {
              'title': "can't be blank",
              'detail': "first_name - can't be blank",
              'code': '100',
              'source': {
                'pointer': '/data/attributes/first_name'
              },
              'status': '422'
            }
          ],
          'meta': {
            'warnings': [
              {
                'title': 'Param not allowed',
                'detail': 'id is not allowed.',
                'code': '105'
              }
            ]
          },
          'links': {
            'self': '/reference/v1/customer_accounts/77/addresses'
          }
        })

      expect.assertions(2)

      return SHIFTClient.createAddressBookEntryV1(body, 77)
        .catch(error => {
          expect(error).toEqual(new Error('Request failed with status code 422'))
          expect(error.response.data.errors[0].title).toEqual("can't be blank")
        })
    })
  })

  describe('deleteAddressV1', () => {
    test('deletes an address from the address book', () => {
      nock(shiftApiConfig.get().apiHost)
        .delete(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/77/addresses/434`)
        .reply(204)

      return SHIFTClient.deleteAddressV1(434, 77)
        .then(response => {
          expect(response.status).toEqual(204)
        })
    })

    test('returns a 404 and logs it to the console if address being deleted does not exist', () => {
      nock(shiftApiConfig.get().apiHost)
        .delete(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/77/addresses/123123123`)
        .reply(404)

      expect.assertions(1)

      return SHIFTClient.deleteAddressV1(123123123, 77)
        .catch(error => {
          expect(error).toEqual(new Error('Request failed with status code 404'))
        })
    })
  })

  describe('createPasswordRecoveryV1', () => {
    test('creates a password recovery token', () => {
      nock(shiftApiConfig.get().apiHost)
        .post(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/99/password_recovery`)
        .reply(201, createPasswordRecoveryResponse)

      return SHIFTClient.createPasswordRecoveryV1(99)
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual(createPasswordRecoveryResponseParsed)
          expect(response.data.token_present).toBe(true)
          expect(response.data.token_expired).toBe(false)
        })
    })

    test('returns an error with a customer account id that does not exist', () => {
      nock(shiftApiConfig.get().apiHost)
        .post(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/123123/password_recovery`)
        .reply(404, createPasswordRecoveryError)

      expect.assertions(3)

      return SHIFTClient.createPasswordRecoveryV1(123123)
        .catch(error => {
          expect(error).toEqual(new Error('Request failed with status code 404'))
          expect(error.response.data.errors[0].detail).toEqual('translation missing: en.api.v1.customer_accounts.password_recovery.create.not_found')
          expect(error.response.data.errors[0].meta.exception).toEqual("Couldn't find CustomerAccount")
        })
    })
  })

  describe('getCustomerAccountByEmailV1', () => {
    test('returns a customer account by their email address', () => {
      const customerAccountEmail = 'testaccount@example.com'

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/email:${customerAccountEmail}`)
        .reply(200, getAccountByEmailResponse)

      return SHIFTClient.getCustomerAccountByEmailV1(customerAccountEmail)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(getAccountByEmailResponseParsed)
        })
    })

    test('returns an error with an email that does not exist', () => {
      const customerAccountEmail = 'fake@fake.com'

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/email:${customerAccountEmail}`)
        .reply(404, {
          'errors': [
            {
              'title': 'Record not found',
              'detail': 'Wrong email/reference/token or password',
              'code': '404',
              'status': '404'
            }
          ],
          'links': {
            'self': '/reference/v1/customer_accounts/email:fake@fake.com'
          }
        })

      expect.assertions(3)

      return SHIFTClient.getCustomerAccountByEmailV1(customerAccountEmail)
        .catch(error => {
          expect(error).toEqual(new Error('Request failed with status code 404'))
          expect(error.response.data.errors[0].title).toEqual('Record not found')
          expect(error.response.data.errors[0].detail).toEqual('Wrong email/reference/token or password')
        })
    })
  })

  describe('getCustomerAccountByTokenV1', () => {
    test('returns a customer account with a valid token', () => {
      const token = 'S2sa1wQTZVxWy_f4_T8p'

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/token:${token}`)
        .reply(200, getAccountByTokenResponse)

      return SHIFTClient.getCustomerAccountByTokenV1(token)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(getAccountByTokenResponseParsed)
        })
    })

    test('returns an error with a token that does not exist or is invalid', () => {
      const token = '12345678911234567891'

      nock(shiftApiConfig.get().apiHost)
        .get(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/token:${token}`)
        .reply(404, {
          'errors': [
            {
              'title': 'Record not found',
              'detail': 'Wrong email/reference/token or password',
              'code': '404',
              'status': '404'
            }
          ],
          'links': {
            'self': '/reference/v1/customer_accounts/token:12345678911234567891'
          }
        })

      expect.assertions(3)

      return SHIFTClient.getCustomerAccountByTokenV1(token)
        .catch(error => {
          expect(error).toEqual(new Error('Request failed with status code 404'))
          expect(error.response.data.errors[0].title).toEqual('Record not found')
          expect(error.response.data.errors[0].detail).toEqual('Wrong email/reference/token or password')
        })
      })
  })
  
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

      return SHIFTClient.createOrderV1(body)
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual(createOrderResponseParsed)
        })
    })
  })
})
