const HTTPClient = require('../http-client')

function getAccountV1(queryObject, customerId) {
  return HTTPClient.get(`v1/customer_accounts/${customerId}`, queryObject).then(response => {
    return {
      status: response.status,
      data: response.data
    }
  })
}

function createCustomerAccountV1(account) {
  return HTTPClient.post('v1/customer_accounts', account).then(response => {
    return {
      status: response.status,
      data: response.data
    }
  })
}

function loginCustomerAccountV1(account) {
  return HTTPClient.post('v1/customer_account_authentications', account).then(response => {
    return {
      status: response.status,
      data: response.data
    }
  })
}

function getCustomerOrdersV1(query) {
  return HTTPClient.get('https://shift-oms-dev.herokuapp.com/oms/v1/customer_orders', query).then(response => {
    return {
      status: response.status,
      data: response.data
    }
  })
}

function getAddressBookV1(customerAccountId) {
  return HTTPClient.get(`v1/customer_accounts/${customerAccountId}/addresses`)
}

function createAddressBookEntryV1(body, customerAccountId) {
  return HTTPClient.post(`v1/customer_accounts/${customerAccountId}/addresses`, body)
}

function deleteAddressV1(addressId, customerAccountId) {
  return HTTPClient.delete(`v1/customer_accounts/${customerAccountId}/addresses/${addressId}`)
}

module.exports = {
  getAccountV1,
  createCustomerAccountV1,
  loginCustomerAccountV1,
  getCustomerOrdersV1,
  getAddressBookV1,
  createAddressBookEntryV1,
  deleteAddressV1
}