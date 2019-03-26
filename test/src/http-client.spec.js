const HTTPClient = require('../../src/http-client')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../src/index')

// Fixtures
const registerPayload = require('../fixtures/register-response-payload')
const staticPagePayload = require('../fixtures/staticpage-response-payload')

axios.defaults.adapter = httpAdapter

afterEach(() => { nock.cleanAll() })

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

describe('HTTPClient', () => {
  describe('get', () => {
    test('returns correct data', () => {
      const url = `v1/static_pages/56`

      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/${url}`)
        .reply(200, staticPagePayload)

      return expect(HTTPClient.get(url)).resolves.toEqual({ status: 200, data: staticPagePayload })
    })

    test('returns error data if a bad request', () => {
      const url = `v1/static_pages/1001`

      const errors = {
        errors:
          [{
            title: 'Record not found',
            detail: 'The record identified by 1001 could not be found.',
            code: '404',
            status: '404'
          }],
        links: { self: '/reference/v1/static_pages/1001?include=meta.%2A' }
      }

      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/${url}`)
        .reply(404, errors)

      return expect(HTTPClient.get(url)).rejects.toEqual(new Error('Request failed with status code 404'))
    })
  })

  describe('post', () => {
    test('saves and returns data', () => {
      const url = 'v1/customer_accounts'

      const body = {
        data: {
          type: 'customer_accounts',
          attributes: {
            email: 'a.fletcher1234@gmail.com',
            email_confirmation: 'a.fletcher1234@gmail.com',
            password: 'qwertyuiop',
            password_confirmation: 'qwertyuiop'
          }
        }
      }

      nock(process.env.API_HOST)
        .post(`/${process.env.API_TENANT}/${url}`)
        .reply(201, registerPayload)

      return expect(HTTPClient.post(url, body)).resolves.toEqual({ status: 201, data: registerPayload })
    })
  })

  describe('delete', () => {
    test('correctly returns successful responses', () => {
      const url = 'v1/addresses'

      // Mock out the delete request
      nock(process.env.API_HOST)
        .delete(`/${process.env.API_TENANT}/${url}`)
        .reply(204)

      // Make the request
      return expect(HTTPClient.delete(url)).resolves.toEqual({ data: '', status: 204 })
    })

    test('correctly returns error responses and logs to console', () => {
      const url = 'v1/addresses'

      // Mock out the delete request
      nock(process.env.API_HOST)
        .delete(`/${process.env.API_TENANT}/${url}`)
        .reply(500)

      // Make the request
      return expect(HTTPClient.delete(url)).rejects.toEqual(new Error('Request failed with status code 500'))
    })
  })
})
