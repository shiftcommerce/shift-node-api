const HTTPClient = require('../http-client')

function getResourceBySlugV1 (queryObject) {
  return HTTPClient.get(`v1/slugs`, queryObject)
}

module.exports = { getResourceBySlugV1 }
