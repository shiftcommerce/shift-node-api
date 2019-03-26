const HTTPClient = require('../http-client')

function getProductV1 (id, query) {
  return HTTPClient.get(`v1/products/${id}`, query)
}

module.exports = { getProductV1 }
