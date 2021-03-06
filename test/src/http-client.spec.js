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

      return expect(HTTPClient.get(url)).resolves.toEqual({ status: 200, data: staticPagePayload, headers: { 'content-type': 'application/json' } })
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

    test('default headers are passed', async () => {
      let headers = {}

      // capture headers from any get request
      nock(process.env.API_HOST).get(() => true).reply(function () { headers = this.req.headers })

      await HTTPClient.get('someurl', {})

      expect(headers).toMatchObject({
        'content-type': 'application/vnd.api+json',
        'accept': 'application/vnd.api+json'
      })
    })

    test('default headers can be added to', async () => {
      let headers = {}

      // capture headers from any get request
      nock(process.env.API_HOST).get(() => true).reply(function () { headers = this.req.headers })

      await HTTPClient.get('someurl', {}, { 'x-dummy-header': 'somevalue' })

      expect(headers).toMatchObject({
        'content-type': 'application/vnd.api+json',
        'accept': 'application/vnd.api+json',
        'x-dummy-header': 'somevalue'
      })
    })

    test('default headers can be overwritten', async () => {
      let headers = {}

      // capture headers from any get request
      nock(process.env.API_HOST).get(() => true).reply(function () { headers = this.req.headers })

      await HTTPClient.get('someurl', {}, { 'Accept': 'somevalue' })

      expect(headers).toMatchObject({
        'content-type': 'application/vnd.api+json',
        'accept': 'somevalue'
      })
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

      const expected = { status: 201, data: registerPayload, headers: { 'content-type': 'application/json' } }
      return expect(HTTPClient.post(url, body)).resolves.toEqual(expected)
    })

    test('default headers are passed', async () => {
      let headers = {}

      // capture headers from any post request
      nock(process.env.API_HOST).post(() => true).reply(function () { headers = this.req.headers })

      await HTTPClient.post('someurl', '')

      expect(headers).toMatchObject({
        'content-type': 'application/vnd.api+json',
        'accept': 'application/vnd.api+json'
      })
    })

    test('default headers can be added to', async () => {
      let headers = {}

      // capture headers from any post request
      nock(process.env.API_HOST).post(() => true).reply(function () { headers = this.req.headers })

      await HTTPClient.post('someurl', '', { 'x-dummy-header': 'somevalue' })

      expect(headers).toMatchObject({
        'content-type': 'application/vnd.api+json',
        'accept': 'application/vnd.api+json',
        'x-dummy-header': 'somevalue'
      })
    })

    test('default headers can be overwritten', async () => {
      let headers = {}

      // capture headers from any post request
      nock(process.env.API_HOST).post(() => true).reply(function () { headers = this.req.headers })

      await HTTPClient.post('someurl', '', { 'Accept': 'somevalue' })

      expect(headers).toMatchObject({
        'content-type': 'application/vnd.api+json',
        'accept': 'somevalue'
      })
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
      return expect(HTTPClient.delete(url)).resolves.toEqual({ data: '', status: 204, headers: {} })
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
