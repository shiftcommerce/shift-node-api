const HTTPClient = require('../http-client')

function getProductByIdV1(id, query) {
  return HTTPClient.get(`v1/products/${id}`, query)
}

module.exports = { getProductByIdV1 }