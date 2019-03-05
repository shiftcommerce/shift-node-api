module.exports = {
  'data': [
    {
      'id': '347',
      'type': 'slugs',
      'links': {
        'self': '/reference/v1/slugs/347.json_api'
      },
      'attributes': {
        'resource_type': 'StaticPage',
        'resource_id': 56,
        'active': true,
        'slug': 'coffee'
      }
    }
  ],
  'meta': {
    'total_entries': 1,
    'page_count': 1
  },
  'links': {
    'self': '/reference/v1/slugs?filter%5Bpath%5D=coffee&page%5Bsize%5D=1&page%5Bnumber%5D=1&fields%5Bslugs%5D=resource_type,resource_id,active,slug',
    'first': '/reference/v1/slugs.json_api?fields%5Bslugs%5D=resource_type%2Cresource_id%2Cactive%2Cslug&filter%5Bpath%5D=coffee&page%5Bnumber%5D=1&page%5Bsize%5D=1',
    'last': '/reference/v1/slugs.json_api?fields%5Bslugs%5D=resource_type%2Cresource_id%2Cactive%2Cslug&filter%5Bpath%5D=coffee&page%5Bnumber%5D=1&page%5Bsize%5D=1'
  }
}
