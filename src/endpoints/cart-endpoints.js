const HTTPClient = require('../http-client')

function getCartV1(cartId) {
  return HTTPClient.get(`v1/carts/${cartId}`)
}

function addLineItemToCartV1(req, res, cartId) {
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
}

function createNewCartWithLineItemV1(req, res) {
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
}

function assignCartToCustomerV1(cartId, customerId) {
  const payload = {
    data: {
      type: 'carts',
      attributes: {
        customer_account_id: customerId
      }
    }
  }

  return HTTPClient.patch(`v1/carts/${cartId}`, payload)
}

function deleteLineItemV1(lineItemId, cartId) {
  const payload = {
    data: {
      type: 'line_items',
      attributes: {
        id: lineItemId
      }
    }
  }

  return HTTPClient.delete(`v1/carts/${cartId}/line_items/${lineItemId}`, payload)
}

function updateLineItemV1(newQuantity, cartId, lineItemId) {
  const payload = {
    data: {
      type: 'line_items',
      attributes: {
        unit_quantity: newQuantity
      }
    }
  }

  return HTTPClient.patch(`v1/carts/${cartId}/line_items/${lineItemId}`, payload)
}

function addCartCouponV1(couponCode, cartId) {
  const payload = {
    data: {
      type: 'coupons',
      attributes: {
        coupon_code: couponCode
      }
    }
  }

  return HTTPClient.post(`v1/carts/${cartId}/coupons`, payload)
}

function setCartShippingMethodV1(cartId, shippingMethodId) {
  const payload = {
    data: {
      type: 'carts',
      attributes: {
        shipping_method_id: shippingMethodId
      }
    }
  }

  return HTTPClient.patch(`v1/carts/${cartId}`, payload)
}

function getShippingMethodsV1() {
  return HTTPClient.get('v1/shipping_methods')
}

function createCustomerAddressV1(req) {
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

  return HTTPClient.post('v1/addresses', payload)
}

function setCartBillingAddressV1(addressId, cartId) {
  const payload = {
    data: {
      type: 'carts',
      attributes: {
        billing_address_id: addressId
      }
    }
  }

  return HTTPClient.patch(`v1/carts/${cartId}`, payload)
}

function setCartShippingAddressV1(addressId, cartId) {
  const payload = {
    data: {
      type: 'carts',
      attributes: {
        shipping_address_id: addressId
      }
    }
  }

  return HTTPClient.patch(`v1/carts/${cartId}`, payload)
}

module.exports = {
  getCartV1,
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
  setCartShippingAddressV1
}