const HTTPClient = require('../http-client')

function createOrderV1 (orderPayload) {
  return HTTPClient.post('v2/create_order?include=line_items', orderPayload)
}

module.exports = { createOrderV1 }
