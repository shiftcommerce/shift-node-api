const HTTPClient = require('../http-client')

function getMenusV1(query) {
  return HTTPClient.get('v1/menus', query)
}

module.exports = getMenusV1