const HTTPClient = require('../http-client')

function getCategoryByIdV1(id) {
  return HTTPClient.get(`v1/category_trees/reference:web/categories/${id}`)
}

module.exports = getCategoryByIdV1