const HTTPClient = require('../http-client')

function getCategoryV1 (id, query) {
  return HTTPClient.get(`v1/category_trees/reference:web/categories/${id}`, query)
}

module.exports = { getCategoryV1 }
