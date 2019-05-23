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
const assetEndpoints = require('./endpoints/asset-endpoints')
const importEndpoints = require('./endpoints/import-endpoints')

class SHIFTClient {
  getMenusV1 (query) {
    return menuEndpoints.getMenusV1(query)
      .then(response => {
        const parsedPayload = new ApiParser().parse(response.data)
        return {
          status: response.status,
          data: parsedPayload.data
        }
      })
  }

  getCartV1 (cartId, query) {
    return cartEndpoints.getCartV1(cartId, query)
      .then(this.determineResponse)
  }

  addLineItemToCartV1 (req, res, cartId) {
    return cartEndpoints.addLineItemToCartV1(req, res, cartId)
      .then(() => this.getCartV1(cartId, req.query))
  }

  createNewCartWithLineItemV1 (req, res) {
    return cartEndpoints.createNewCartWithLineItemV1(req, res)
      .then((response) => {
        // Extract and assign cartId from response
        const cartId = response.data.data.id
        // Extract and assign customerId from request session
        const customerId = req.session.customerId
        if (customerId) {
          // Assign customerId to cart and retrieve updated cart
          return this.assignCartToCustomerV1(cartId, customerId)
            .then(() => this.getCartV1(cartId, req.query))
        }
        // retrieve cart
        return this.getCartV1(cartId, req.query)
      })
  }

  assignCartToCustomerV1 (cartId, customerId) {
    return cartEndpoints.assignCartToCustomerV1(cartId, customerId)
      .then(this.determineResponse)
  }

  deleteLineItemV1 (lineItemId, cartId, query) {
    return cartEndpoints.deleteLineItemV1(lineItemId, cartId)
      .then(() => this.getCartV1(cartId, query))
  }

  updateLineItemV1 (newQuantity, cartId, lineItemId, query) {
    return cartEndpoints.updateLineItemV1(newQuantity, cartId, lineItemId)
      .then(() => this.getCartV1(cartId, query))
  }

  addCartCouponV1 (couponCode, cartId) {
    return cartEndpoints.addCartCouponV1(couponCode, cartId)
      .then(this.determineResponse)
  }

  setCartShippingMethodV1 (cartId, shippingMethodId, query) {
    return cartEndpoints.setCartShippingMethodV1(cartId, shippingMethodId)
      .then(() => this.getCartV1(cartId, query))
  }

  getShippingMethodsV1 () {
    return cartEndpoints.getShippingMethodsV1()
      .then(this.determineResponse)
  }

  createCustomerAddressV1 (req) {
    return cartEndpoints.createCustomerAddressV1(req)
      .then(this.determineResponse)
  }

  setCartBillingAddressV1 (addressId, cartId, query) {
    return cartEndpoints.setCartBillingAddressV1(addressId, cartId)
      .then(() => this.getCartV1(cartId, query))
  }

  setCartShippingAddressV1 (addressId, cartId, query) {
    return cartEndpoints.setCartShippingAddressV1(addressId, cartId)
      .then(() => this.getCartV1(cartId, query))
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

  getArticleStaticPageV1 (query) {
    return staticPageEndpoints.getArticleStaticPageV1(query)
      .then(this.determineResponse)
  }

  getCategoryV1 (id, query) {
    return categoryEndpoints.getCategoryV1(id, query)
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

  createAssetsFilesV1 (assets) {
    return assetEndpoints.createAssetsFilesV1(assets)
  }

  createProductAssetFilesV1 (mappings) {
    return assetEndpoints.createProductAssetFilesV1(mappings)
  }

  getImport (id, query) {
    return importEndpoints.getImportV1(id, query)
  }

  determineResponse (response) {
    const parsedPayload = new ApiParser().parse(response.data)
    // Fallback if parser returns undefined
    const payload = parsedPayload || response.data
    return {
      status: response.status,
      data: payload,
      headers: response.headers
    }
  }
}

module.exports = new SHIFTClient()
