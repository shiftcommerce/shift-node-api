const HTTPClient = require('../http-client')

function getAccountV1 (queryObject, customerId) {
  return HTTPClient.get(`v1/customer_accounts/${customerId}`, queryObject).then(response => {
    return {
      status: response.status,
      data: response.data
    }
  })
}

function updateCustomerAccountV1 (body, customerAccountId) {
  return HTTPClient.patch(`v1/customer_accounts/${customerAccountId}`, body)
}

function createCustomerAccountV1 (account) {
  return HTTPClient.post('v1/customer_accounts', account).then(response => {
    return {
      status: response.status,
      data: response.data
    }
  })
}

function loginCustomerAccountV1 (account) {
  return HTTPClient.post('v1/customer_account_authentications', account).then(response => {
    return {
      status: response.status,
      data: response.data
    }
  })
}

function getCustomerOrdersV1 (query) {
  return HTTPClient.get('https://shift-oms-dev.herokuapp.com/oms/v1/customer_orders', query).then(response => {
    return {
      status: response.status,
      data: response.data
    }
  })
}

function getAddressBookV1 (customerAccountId) {
  return HTTPClient.get(`v1/customer_accounts/${customerAccountId}/addresses`)
}

function createAddressBookEntryV1 (body, customerAccountId) {
  return HTTPClient.post(`v1/customer_accounts/${customerAccountId}/addresses`, body)
}

function updateAddressV1 (body, addressId) {
  return HTTPClient.patch(`v1/addresses/${addressId}`, body)
}

function deleteAddressV1 (addressId, customerAccountId) {
  return HTTPClient.delete(`v1/customer_accounts/${customerAccountId}/addresses/${addressId}`)
}

function getCustomerAccountByEmailV1 (email) {
  return HTTPClient.get(`v1/customer_accounts/email:${email}`)
}

function createPasswordRecoveryV1 (accountId, data) {
  return HTTPClient.post(`v1/customer_accounts/${accountId}/password_recovery`, data)
}

function getCustomerAccountByTokenV1 (token) {
  return HTTPClient.get(`v1/customer_accounts/token:${token}`)
}

function updateCustomerAccountPasswordV1 (accountId, body) {
  return HTTPClient.patch(`v1/customer_accounts/${accountId}/password_recovery`, body)
}

module.exports = {
  getAccountV1,
  updateCustomerAccountV1,
  createCustomerAccountV1,
  loginCustomerAccountV1,
  getCustomerOrdersV1,
  getAddressBookV1,
  createAddressBookEntryV1,
  deleteAddressV1,
  getCustomerAccountByEmailV1,
  createPasswordRecoveryV1,
  getCustomerAccountByTokenV1,
  updateCustomerAccountPasswordV1,
  updateAddressV1
}
