const axios = require('axios')
const qs = require('qs')
const { shiftApiConfig } = require('./index')

const headers = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json'
}

class HTTPClient {
  get (url, queryObject) {
    const query = qs.stringify(queryObject)
    const requestUrl = this.createRequestUrl(url, query)

    const response = axios({
      method: 'get',
      url: requestUrl,
      headers: headers,
      auth: {
        username: shiftApiConfig.get().apiTenant,
        password: shiftApiConfig.get().apiAccessToken
      }
    })

    return this.determineResponse(response)
  }

  post (url, body) {
    const requestUrl = this.createRequestUrl(url)

    const response = axios({
      method: 'post',
      url: requestUrl,
      headers: headers,
      auth: {
        username: shiftApiConfig.get().apiTenant,
        password: shiftApiConfig.get().apiAccessToken
      },
      data: body
    })

    return this.determineResponse(response)
  }

  patch (url, body) {
    const requestUrl = this.createRequestUrl(url)

    const response = axios({
      method: 'patch',
      url: requestUrl,
      headers: headers,
      auth: {
        username: shiftApiConfig.get().apiTenant,
        password: shiftApiConfig.get().apiAccessToken
      },
      data: body
    })

    return this.determineResponse(response)
  }

  delete (url) {
    const requestUrl = this.createRequestUrl(url)

    const response = axios({
      method: 'delete',
      url: requestUrl,
      headers: headers,
      auth: {
        username: shiftApiConfig.get().apiTenant,
        password: shiftApiConfig.get().apiAccessToken
      }
    })

    return this.determineResponse(response)
  }

  createRequestUrl (url, query) {
    let requestUrl

    // TODO: remove this when oms platform proxy is live
    const regex = /shift-oms-dev/i

    if (!query) {
      requestUrl = `${shiftApiConfig.get().apiHost}/${shiftApiConfig.get().apiTenant}/${url}`
    } else if (regex.test(url)) {
      // TODO: remove this statement when platform proxy is live
      requestUrl = `${url}/?${query}`
    } else {
      requestUrl = `${shiftApiConfig.get().apiHost}/${shiftApiConfig.get().apiTenant}/${url}?${query}`
    }

    return requestUrl
  }

  determineResponse (response) {
    return response
      .then(response => {
        return Promise.resolve({ status: response.status, data: response.data })
      })
      .catch(error => {
        console.log('Error is:', error)
        return Promise.reject(error)
      })
  }
}

module.exports = new HTTPClient()
