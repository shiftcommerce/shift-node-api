const HTTPClient = require('../http-client')

function getStaticPageV1 (id, query) {
  return HTTPClient.get(`v1/static_pages/${id}`, query)
}

module.exports = { getStaticPageV1 }
