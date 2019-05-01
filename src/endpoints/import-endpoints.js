const HTTPClient = require('../http-client')

function getImportV1 (id, query) {
  return HTTPClient.get(`v1/imports/${id}`, query)
}

module.exports = {
  getImportV1
}
