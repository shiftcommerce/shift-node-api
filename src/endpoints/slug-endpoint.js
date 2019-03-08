const HTTPClient = require('../http-client')

function getSlugDataV1(queryObject) {
  return HTTPClient.get(`v1/slugs`, queryObject)
}

module.exports = { getSlugDataV1 }