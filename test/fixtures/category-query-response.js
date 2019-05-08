module.exports = {
  data: {
    id: '3',
    type: 'categories',
    links: {
      self: '/reference/v1/categories/3.json_api'
    },
    attributes: {
      meta_attributes: {},
      updated_at: '2019-05-07T15:09:59Z',
      created_at: '2019-05-07T15:02:10Z',
      deleted_at: null,
      slug: 'brands/galvin-green',
      canonical_path: '/categories/brands/galvin-green',
      title: 'Galvin Green',
      reference: 'brands-galvin-green',
      published: true,
      category_tree_id: 1,
      products_leading_variants: [],
      sorting_rules: [],
      facets: []
    },
    relationships: {
      template_definition: {
        links: {
          self: '/reference/v1/categories/3/relationships/template_definition.json_api',
          related: '/reference/v1/categories/3/template_definition.json_api'
        }
      },
      template: {
        links: {
          self: '/reference/v1/categories/3/relationships/template.json_api',
          related: '/reference/v1/categories/3/template.json_api'
        },
        data: {
          type: 'templates',
          id: '4'
        }
      },
      parent: {
        links: {
          self: '/reference/v1/categories/3/relationships/parent.json_api',
          related: '/reference/v1/categories/3/parent.json_api'
        }
      },
      children: {
        links: {
          self: '/reference/v1/categories/3/relationships/children.json_api',
          related: '/reference/v1/categories/3/children.json_api'
        }
      },
      products: {
        links: {
          self: '/reference/v1/categories/3/relationships/products.json_api',
          related: '/reference/v1/categories/3/products.json_api'
        }
      }
    }
  },
  included: [
    {
      id: '4',
      type: 'templates',
      links: {
        self: '/reference/v1/templates/4.json_api'
      },
      attributes: {
        reference: 'category'
      },
      relationships: {
        sections: {
          links: {
            self: '/reference/v1/templates/4/relationships/sections.json_api',
            related: '/reference/v1/templates/4/sections.json_api'
          },
          data: [
            {
              type: 'sections',
              id: '5'
            }
          ]
        },
        section: {
          links: {
            self: '/reference/v1/templates/4/relationships/section.json_api',
            related: '/reference/v1/templates/4/section.json_api'
          },
          data: {
            type: 'sections',
            id: '5'
          }
        }
      }
    },
    {
      id: '5',
      type: 'sections',
      links: {
        self: '/reference/v1/sections/5.json_api'
      },
      attributes: {
        reference: 'section'
      },
      relationships: {
        components: {
          links: {
            self: '/reference/v1/sections/5/relationships/components.json_api',
            related: '/reference/v1/sections/5/components.json_api'
          },
          data: [
            {
              type: 'components',
              id: '5_1'
            }
          ]
        }
      }
    },
    {
      id: '5_1',
      type: 'components',
      links: {
        self: '/reference/v1/components/5_1.json_api'
      },
      attributes: {
        image: null,
        reference: 'fifty_fifty',
        body: '<div>Nike is one of the world’s leading and best-known sportswear brands. Nike Golf became a cornerstone to the industry since linking up with golfers of the calibre of Tiger Woods and Rory McIlroy.</div><div><br></div><div>With modern designs, updated silhouettes, and the iconic swoosh logo, the 2017 range offers everything in terms of performance, style, and comfort.</div><div><br></div><div>Nike’s Dri-FIT technology, a high-performance fabric that moves perspiration away from the body, is used in a variety of their products.</div><div><br></div><div>Shop the TW Collection <a target="_blank" rel="nofollow">here</a></div>',
        title: 'Nike',
        category: 'Brand',
        subtitle: '',
        overlay_title: ''
      },
      relationships: {
        image: {
          links: {
            self: '/reference/v1/components/5_1/relationships/image.json_api',
            related: '/reference/v1/components/5_1/image.json_api'
          },
          data: []
        }
      }
    }
  ],
  links: {
    self: '/reference/v1/category_trees/reference:web/categories/3?include=template'
  }
}
