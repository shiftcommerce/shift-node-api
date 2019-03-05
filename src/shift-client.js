const HTTPClient = require('./http-client')
const ApiParser = require('../lib/json-api-parser')

class SHIFTClient {
  config (config) {
    // TODO: implement when we allow people to define a config for http client
  }

  getMenusV1 (query) {
    return HTTPClient.get('v1/menus', query)
      .then(response => {
        const parsedPayload = new ApiParser().parse(response.data)
        return {
          status: response.status,
          data: parsedPayload.data[0]
        }
      })
  }

  getCartV1 (cartId) {
    return HTTPClient.get(`v1/carts/${cartId}`).then(this.determineResponse)
  }

  addLineItemToCartV1 (req, res, cartId) {
    const payload = {
      data: {
        type: 'line_items',
        attributes: {
          cart_id: cartId,
          item_id: req.body.variantId,
          unit_quantity: req.body.quantity,
          item_type: 'Variant'
        }
      }
    }
    return HTTPClient.post(`v1/carts/${cartId}/line_items`, payload)
      .then(() => this.getCartV1(cartId))
  }

  createNewCartWithLineItemV1 (req, res) {
    const payload = {
      data: {
        type: 'carts',
        attributes: {
          initial_line_items: [{
            variant_id: req.body.variantId,
            unit_quantity: req.body.quantity
          }]
        }
      }
    }

    return HTTPClient.post(`v1/carts`, payload)
      .then(response => {
        if (req.session.customerId) {
          return this.assignCartToCustomerV1(response.data.data.id, req.session.customerId)
        }
        return this.determineResponse(response)
      }).then(response => {
        this.createCartCookie(res, response)
        return response
      })
  }

  assignCartToCustomerV1 (cartId, customerId) {
    const payload = {
      data: {
        type: 'carts',
        attributes: {
          customer_account_id: customerId
        }
      }
    }

    return HTTPClient.patch(`v1/carts/${cartId}`, payload).then(this.determineResponse)
  }

  deleteLineItemV1 (lineItemId, cartId) {
    const payload = {
      data: {
        type: 'line_items',
        attributes: {
          id: lineItemId
        }
      }
    }

    return HTTPClient.delete(`v1/carts/${cartId}/line_items/${lineItemId}`, payload).then(() => this.getCartV1(cartId))
  }

  updateLineItemV1 (newQuantity, cartId, lineItemId) {
    const payload = {
      data: {
        type: 'line_items',
        attributes: {
          unit_quantity: newQuantity
        }
      }
    }

    return HTTPClient.patch(`v1/carts/${cartId}/line_items/${lineItemId}`, payload)
      .then(() => this.getCartV1(cartId))
  }

  addCartCouponV1 (couponCode, cartId) {
    const payload = {
      data: {
        type: 'coupons',
        attributes: {
          coupon_code: couponCode
        }
      }
    }

    return HTTPClient.post(`v1/carts/${cartId}/coupons`, payload).then(this.determineResponse)
  }

  setCartShippingMethodV1 (cartId, shippingMethodId) {
    const payload = {
      data: {
        type: 'carts',
        attributes: {
          shipping_method_id: shippingMethodId
        }
      }
    }

    return HTTPClient.patch(`v1/carts/${cartId}`, payload).then(this.determineResponse)
  }

  getShippingMethodsV1 () {
    return HTTPClient.get('v1/shipping_methods').then(this.determineResponse)
  }

  createCustomerAddressV1 (req) {
    const payload = {
      data: {
        type: 'addresses',
        attributes: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          address_line_1: req.body.line_1,
          address_line_2: req.body.line_2,
          city: req.body.city,
          country: req.body.country_code,
          postcode: req.body.zipcode,
          meta_attributes: {
            email: {
              value: req.body.email
            },
            phone_number: {
              value: req.body.primary_phone
            }
          }
        }
      }
    }

    return HTTPClient.post('v1/addresses', payload).then(this.determineResponse)
  }

  setCartBillingAddressV1 (addressId, cartId) {
    const payload = {
      data: {
        type: 'carts',
        attributes: {
          billing_address_id: addressId
        }
      }
    }

    return HTTPClient.patch(`v1/carts/${cartId}`, payload).then(this.determineResponse)
  }

  setCartShippingAddressV1 (addressId, cartId) {
    const payload = {
      data: {
        type: 'carts',
        attributes: {
          shipping_address_id: addressId
        }
      }
    }

    return HTTPClient.patch(`v1/carts/${cartId}`, payload).then(this.determineResponse)
  }

  getSlugDataV1 (queryObject) {
    return HTTPClient.get(`v1/slugs`, queryObject)
      .then(response => {
        const parsedPayload = new ApiParser().parse(response.data)
        return {
          status: response.status,
          data: parsedPayload.data[0]
        }
      })
  }

  getProductByIdV1 (id, query) {
    return HTTPClient.get(`v1/products/${id}`, query).then(this.determineResponse)
  }

  getStaticPageV1 (id, query) {
    return HTTPClient.get(`v1/static_pages/${id}`, query).then(this.determineResponse)
  }

  getCategoryByIdV1 (id) {
    return HTTPClient.get(`v1/category_trees/reference:web/categories/${id}`).then(this.determineResponse)
  }

  getAccountV1 (queryObject, customerId) {
    return HTTPClient.get(`v1/customer_accounts/${customerId}`, queryObject).then(response => {
      return {
        status: response.status,
        data: response.data
      }
    })
  }

  createCustomerAccountV1 (account) {
    return HTTPClient.post('v1/customer_accounts', account).then(response => {
      return {
        status: response.status,
        data: response.data
      }
    })
  }

  loginCustomerAccountV1 (account) {
    return HTTPClient.post('v1/customer_account_authentications', account).then(response => {
      return {
        status: response.status,
        data: response.data
      }
    })
  }

  getCustomerOrdersV1 (query) {
    return HTTPClient.get('https://shift-oms-dev.herokuapp.com/oms/v1/customer_orders', query).then(response => {
      return {
        status: response.status,
        data: response.data
      }
    })
  }

  getAddressBookV1 (customerAccountId) {
    return HTTPClient.get(`v1/customer_accounts/${customerAccountId}/addresses`)
      .then(this.determineResponse)
  }

  createAddressBookEntryV1 (body, customerAccountId) {
    return HTTPClient.post(`v1/customer_accounts/${customerAccountId}/addresses`, body)
      .then(this.determineResponse)
  }

  deleteAddressV1 (addressId, customerAccountId) {
    return HTTPClient.delete(`v1/customer_accounts/${customerAccountId}/addresses/${addressId}`)
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
