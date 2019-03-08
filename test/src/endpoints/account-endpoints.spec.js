const { getAccountV1,
  createCustomerAccountV1,
  loginCustomerAccountV1,
  getCustomerOrdersV1,
  getAddressBookV1,
  createAddressBookEntryV1,
  deleteAddressV1 } = require('../../../src/endpoints/account-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const registerResponse = require('../../fixtures/register-response')
const register422response = require('../../fixtures/register-422-response')
const loginResponse = require('../../fixtures/login-response')
const customerOrdersResponse = require('../../fixtures/customer-orders-response')
const addressBookResponse = require('../../fixtures/addressbook-response')
const createAddressBookResponse = require('../../fixtures/create-addressbook-response')

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getAccountV1', () => {
  it('gets an account if there is a customer id', () => {
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

    return getAccountV1(queryObject, customerId)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(accountData)
      })
  })
})

describe('getCustomerOrdersV1', () => {
  it('gets customer orders from oms', () => {
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

    return getCustomerOrdersV1(query)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(customerOrdersResponse)
      })
  })

  it('should return errors if no customer_reference is present', () => {
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

    return getCustomerOrdersV1(query)
      .catch(error => {
        expect(error.response.status).toEqual(422)
        expect(error.response.data.errors[0].detail).toEqual('No filter[customer_reference] specified')
      })
  })
})

describe('getAddressBookV1', () => {
  it('endpoint returns address book with correct id', () => {
    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/77/addresses`)
      .reply(200, addressBookResponse)

    return getAddressBookV1(77)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(addressBookResponse)
      })
  })

  it('endpoint returns an empty array with an id that has no addresses or is invalid', () => {
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

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/123123123/addresses`)
      .reply(200, addressBookWrongIdResponse)

    return getAddressBookV1(123123123)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(addressBookWrongIdResponse)
      })
  })
})

describe('deleteAddressV1', () => {
  it('deletes an address from the address book', () => {
    nock(shiftApiConfig.get().apiHost)
      .delete(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/77/addresses/434`)
      .reply(204)

    return deleteAddressV1(434, 77)
      .then(response => {
        expect(response.status).toEqual(204)
      })
  })

  it('returns a 404 and logs it to the console if address being deleted does not exist', () => {
    nock(shiftApiConfig.get().apiHost)
      .delete(`/${shiftApiConfig.get().apiTenant}/v1/customer_accounts/77/addresses/123123123`)
      .reply(404)

    expect.assertions(1)

    return deleteAddressV1(123123123, 77)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 404'))
      })
  })
})

describe('createAddressBookEntryV1', () => {
  it('saves an address to the address book', () => {
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

    return createAddressBookEntryV1(body, 77)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual(createAddressBookResponse)
      })
  })

  it('returns an error with a missing field', () => {
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

    return createAddressBookEntryV1(body, 77)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 422'))
        expect(error.response.data.errors[0].title).toEqual("can't be blank")
      })
  })
})

describe('createCustomerAccountV1', () => {
  it('allows you to create an account with a correct payload', () => {
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

    return createCustomerAccountV1(body)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual(registerResponse)
      })
  })

  it('errors if account already exists', () => {
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

    return createCustomerAccountV1(body)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 422'))
        expect(error.response.data.errors[0].title).toEqual('has already been taken')
        expect(error.response.data.errors[0].detail).toEqual('email - has already been taken')
      })
  })
})

describe('loginCustomerAccountV1', () => {
  it('allows you to login to an account with a correct payload', () => {
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

    return loginCustomerAccountV1(body)
      .then(response => {
        expect(response.status).toEqual(201)
        expect(response.data).toEqual(loginResponse)
      })
  })

  it('errors if account doesnt exist', () => {
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

    return loginCustomerAccountV1(body)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 404'))
        expect(error.response.data.errors[0].title).toEqual('Record not found')
        expect(error.response.data.errors[0].detail).toEqual('Wrong email/reference/token or password')
      })
  })
})