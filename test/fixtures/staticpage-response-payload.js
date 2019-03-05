module.exports = {
  data: {
    id: '56',
    type: 'static_pages',
    links: { self: '/reference/v1/static_pages/56.json_api' },
    attributes:
    {
      meta_attributes: {},
      updated_at: '2018-11-29T15:13:12Z',
      created_at: '2018-10-17T13:38:43Z',
      slug: 'coffee',
      canonical_path: '/coffee',
      title: 'Coffee',
      reference: 'coffee',
      body_content: '',
      published: true
    },
    relationships: {
      template_definition: {
        links: {
          self: '/reference/v1/static_pages/56/relationships/template_definition.json_api',
          related: '/reference/v1/static_pages/56/template_definition.json_api'
        }
      },
      template: {
        links: {
          self: '/reference/v1/static_pages/56/relationships/template.json_api',
          related: '/reference/v1/static_pages/56/template.json_api'
        }
      }
    }
  },
  links: { self: '/reference/v1/static_pages/56?include=meta.%2A' }
}
