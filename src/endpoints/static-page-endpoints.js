const HTTPClient = require('../http-client')

function getStaticPageV1 (id, query) {
  return HTTPClient.get(`v1/static_pages/${id}`, query)
}

function getArticleStaticPageV1(query) {
  return HTTPClient.get(`v1/static_pages`, query)
}

module.exports = { getStaticPageV1, getArticleStaticPageV1 }
