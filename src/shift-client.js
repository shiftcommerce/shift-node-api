const ApiParser = require('./lib/json-api-parser')

// Endpoints
const menuEndpoints = require('./endpoints/menu-endpoints')
const cartEndpoints = require('./endpoints/cart-endpoints')
const slugEndpoints = require('./endpoints/slug-endpoints')
const productEndpoints = require('./endpoints/product-endpoints')
const staticPageEndpoints = require('./endpoints/static-page-endpoints')
const categoryEndpoints = require('./endpoints/category-endpoints')
const accountEndpoints = require('./endpoints/account-endpoints')
const orderEndpoints = require('./endpoints/order-endpoints')

class SHIFTClient {
  getMenusV1 (query) {
    return menuEndpoints.getMenusV1(query)
      .then(response => {
        const parsedPayload = new ApiParser().parse(response.data)
        return {
          status: response.status,
          data: parsedPayload.data[0]
        }
      })
  }

  getCartV1 (cartId) {
    return cartEndpoints.getCartV1(cartId)
      .then(this.determineResponse)
  }

  addLineItemToCartV1 (req, res, cartId) {
    return cartEndpoints.addLineItemToCartV1(req, res, cartId)
      .then(() => this.getCartV1(cartId))
  }

  createNewCartWithLineItemV1 (req, res) {
    return cartEndpoints.createNewCartWithLineItemV1(req, res)
      .then(response => {
        if (req.session.customerId) {
          return this.assignCartToCustomerV1(response.data.data.id, req.session.customerId)
        }
        return response
      }).then(this.determineResponse)
  }

  assignCartToCustomerV1 (cartId, customerId) {
    return cartEndpoints.assignCartToCustomerV1(cartId, customerId)
      .then(this.determineResponse)
  }

  deleteLineItemV1 (lineItemId, cartId) {
    return cartEndpoints.deleteLineItemV1(lineItemId, cartId)
      .then(() => this.getCartV1(cartId))
  }

  updateLineItemV1 (newQuantity, cartId, lineItemId) {
    return cartEndpoints.updateLineItemV1(newQuantity, cartId, lineItemId)
      .then(() => this.getCartV1(cartId))
  }

  addCartCouponV1 (couponCode, cartId) {
    return cartEndpoints.addCartCouponV1(couponCode, cartId)
      .then(this.determineResponse)
  }

  setCartShippingMethodV1 (cartId, shippingMethodId) {
    return cartEndpoints.setCartShippingMethodV1(cartId, shippingMethodId)
      .then(this.determineResponse)
  }

  getShippingMethodsV1 () {
    return cartEndpoints.getShippingMethodsV1()
      .then(this.determineResponse)
  }

  createCustomerAddressV1 (req) {
    return cartEndpoints.createCustomerAddressV1(req)
      .then(this.determineResponse)
  }

  setCartBillingAddressV1 (addressId, cartId) {
    return cartEndpoints.setCartBillingAddressV1(addressId, cartId)
      .then(this.determineResponse)
  }

  setCartShippingAddressV1 (addressId, cartId) {
    return cartEndpoints.setCartShippingAddressV1(addressId, cartId)
  }

  getResourceBySlugV1 (queryObject) {
    return slugEndpoints.getResourceBySlugV1(queryObject)
      .then(response => {
        const parsedPayload = new ApiParser().parse(response.data)
        return {
          status: response.status,
          data: parsedPayload.data[0]
        }
      })
  }

  getProductV1 (id, query) {
    return productEndpoints.getProductV1(id, query)
      .then(this.determineResponse)
  }

  getStaticPageV1 (id, query) {
    return staticPageEndpoints.getStaticPageV1(id, query)
      .then(this.determineResponse)
  }

  getCategoryV1 (id) {
    return categoryEndpoints.getCategoryV1(id)
      .then(this.determineResponse)
  }

  getAccountV1 (queryObject, customerId) {
    return accountEndpoints.getAccountV1(queryObject, customerId)
  }

  updateCustomerAccountV1 (body, customerId) {
    return accountEndpoints.updateCustomerAccountV1(body, customerId)
  }

  createCustomerAccountV1 (account) {
    return accountEndpoints.createCustomerAccountV1(account)
  }

  loginCustomerAccountV1 (account) {
    return accountEndpoints.loginCustomerAccountV1(account)
  }

  getCustomerOrdersV1 (query) {
    return accountEndpoints.getCustomerOrdersV1(query)
  }

  getAddressBookV1 (customerAccountId) {
    return accountEndpoints.getAddressBookV1(customerAccountId)
      .then(this.determineResponse)
  }

  createAddressBookEntryV1 (body, customerAccountId) {
    return accountEndpoints.createAddressBookEntryV1(body, customerAccountId)
      .then(this.determineResponse)
  }

  updateCustomerAddressV1 (body, addressId, customerId) {
    return accountEndpoints.updateCustomerAddressV1(body, addressId, customerId)
      .then(this.determineResponse)
  }

  deleteAddressV1 (addressId, customerAccountId) {
    return accountEndpoints.deleteAddressV1(addressId, customerAccountId)
      .then(this.determineResponse)
  }

  createOrderV1 (orderPayload) {
    return orderEndpoints.createOrderV1(orderPayload).then(this.determineResponse)
  }

  getCustomerAccountByEmailV1 (email) {
    return accountEndpoints.getCustomerAccountByEmailV1(email)
      .then(this.determineResponse)
  }

  createPasswordRecoveryV1 (accountId, data) {
    return accountEndpoints.createPasswordRecoveryV1(accountId, data)
      .then(this.determineResponse)
  }

  getCustomerAccountByTokenV1 (token) {
    return accountEndpoints.getCustomerAccountByTokenV1(token)
      .then(this.determineResponse)
  }

  updateCustomerAccountPasswordV1 (accountId, body) {
    return accountEndpoints.updateCustomerAccountPasswordV1(accountId, body)
      .then(this.determineResponse)
  }

  determineResponse (response) {
    const parsedPayload = new ApiParser().parse(response.data)
    // Fallback if parser returns undefined
    const payload = parsedPayload || response.data
    return {
      status: response.status,
      data: payload
    }
  }
}

module.exports = new SHIFTClient()
