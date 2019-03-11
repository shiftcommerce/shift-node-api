const ApiParser = require('./lib/json-api-parser')

// Endpoints
const menuEndpoints = require('./endpoints/menu-endpoints')
const cartEndpoints = require('./endpoints/cart-endpoints')
const slugEndpoints = require('./endpoints/slug-endpoints')
const productEndpoints = require('./endpoints/product-endpoints')
const staticPageEndpoints = require('./endpoints/static-page-endpoints')
const categoryEndpoints = require('./endpoints/category-endpoints')
const accountEndpoints = require('./endpoints/account-endpoints')

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
      }).then(response => {
        this.createCartCookie(res, response)
        return response
      })
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

  getSlugDataV1 (queryObject) {
    return slugEndpoints.getSlugDataV1(queryObject)
      .then(response => {
        const parsedPayload = new ApiParser().parse(response.data)
        return {
          status: response.status,
          data: parsedPayload.data[0]
        }
      })
  }

  getProductByIdV1 (id, query) {
    return productEndpoints.getProductByIdV1(id, query)
      .then(this.determineResponse)
  }

  getStaticPageV1 (id, query) {
    return staticPageEndpoints.getStaticPageV1(id, query)
      .then(this.determineResponse)
  }

  getCategoryByIdV1 (id) {
    return categoryEndpoints.getCategoryByIdV1(id)
      .then(this.determineResponse)
  }

  getAccountV1 (queryObject, customerId) {
    return accountEndpoints.getAccountV1(queryObject, customerId)
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

  deleteAddressV1 (addressId, customerAccountId) {
    return accountEndpoints.deleteAddressV1(addressId, customerAccountId)
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

  // TODO: migrate this to shift-next
  createCartCookie (res, response) {
    if (response.data.id) {
      res.cookie('cart', response.data.id, {
        signed: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      })
    }
  }
}

module.exports = new SHIFTClient()
