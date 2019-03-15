module.exports = {
  'data': [
    {
      'id': '8c763d38-6ea9-404a-a6cd-ea7e8cc31a61',
      'type': 'products',
      'links': {
        'self': 'http://localhost:5000/pim/v1/products/8c763d38-6ea9-404a-a6cd-ea7e8cc31a61'
      },
      'attributes': {
        'reference': 'that-leather-bench',
        'title': 'Leather Bench',
        'meta_data': {},
        'created_at': '2017-09-01T10:11:26.783Z',
        'updated_at': '2017-09-01T10:11:26.783Z',
        'archived_at': null
      },
      'relationships': {
        'variants': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/products/8c763d38-6ea9-404a-a6cd-ea7e8cc31a61/relationships/variants',
            'related': 'http://localhost:5000/pim/v1/products/8c763d38-6ea9-404a-a6cd-ea7e8cc31a61/variants'
          },
          'data': [
            {
              'type': 'variants',
              'id': '2a6f73cc-6568-4b4d-8025-9a55dcc00d70'
            }
          ]
        },
        'categories': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/products/8c763d38-6ea9-404a-a6cd-ea7e8cc31a61/relationships/categories',
            'related': 'http://localhost:5000/pim/v1/products/8c763d38-6ea9-404a-a6cd-ea7e8cc31a61/categories'
          }
        },
        'asset_files': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/products/8c763d38-6ea9-404a-a6cd-ea7e8cc31a61/relationships/asset_files',
            'related': 'http://localhost:5000/pim/v1/products/8c763d38-6ea9-404a-a6cd-ea7e8cc31a61/asset_files'
          },
          'data': []
        }
      }
    },
    {
      'id': 'e2bcfe2c-16c1-4029-85e3-ce7b98f1d1ad',
      'type': 'products',
      'links': {
        'self': 'http://localhost:5000/pim/v1/products/e2bcfe2c-16c1-4029-85e3-ce7b98f1d1ad'
      },
      'attributes': {
        'reference': 'first-steel-shirt',
        'title': 'Steel Shirt',
        'meta_data': {},
        'created_at': '2017-09-01T10:11:26.762Z',
        'updated_at': '2017-09-01T10:11:26.762Z',
        'archived_at': null
      },
      'relationships': {
        'variants': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/products/e2bcfe2c-16c1-4029-85e3-ce7b98f1d1ad/relationships/variants',
            'related': 'http://localhost:5000/pim/v1/products/e2bcfe2c-16c1-4029-85e3-ce7b98f1d1ad/variants'
          },
          'data': [
            {
              'type': 'variants',
              'id': '7932b43f-0eba-408c-b5b1-a7ff407d8ebc'
            }
          ]
        },
        'categories': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/products/e2bcfe2c-16c1-4029-85e3-ce7b98f1d1ad/relationships/categories',
            'related': 'http://localhost:5000/pim/v1/products/e2bcfe2c-16c1-4029-85e3-ce7b98f1d1ad/categories'
          }
        },
        'asset_files': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/products/e2bcfe2c-16c1-4029-85e3-ce7b98f1d1ad/relationships/asset_files',
            'related': 'http://localhost:5000/pim/v1/products/e2bcfe2c-16c1-4029-85e3-ce7b98f1d1ad/asset_files'
          },
          'data': []
        }
      }
    },
    {
      'id': 'c51f71ec-3e5e-4305-983a-c8c5b7509ace',
      'type': 'products',
      'links': {
        'self': 'http://localhost:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace'
      },
      'attributes': {
        'reference': 'textured-long-t-shirt',
        'title': 'Textured Long T Shirt',
        'meta_data': {},
        'created_at': '2017-09-01T10:11:26.734Z',
        'updated_at': '2017-09-01T10:11:26.734Z',
        'archived_at': null
      },
      'relationships': {
        'variants': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/relationships/variants',
            'related': 'http://localhost:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/variants'
          },
          'data': [
            {
              'type': 'variants',
              'id': '27985460-8ad7-4455-bdfd-a9ee107d87bb'
            }
          ]
        },
        'categories': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/relationships/categories',
            'related': 'http://localhost:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/categories'
          }
        },
        'asset_files': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/relationships/asset_files',
            'related': 'http://localhost:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/asset_files'
          },
          'data': []
        }
      }
    }
  ],
  'included': [
    {
      'id': '2a6f73cc-6568-4b4d-8025-9a55dcc00d70',
      'type': 'variants',
      'links': {
        'self': 'http://localhost:5000/pim/v1/variants/2a6f73cc-6568-4b4d-8025-9a55dcc00d70'
      },
      'attributes': {
        'sku': '867026361-0',
        'title': 'Mediocre Leather Bench',
        'created_at': '2017-09-01T10:11:26.585Z',
        'updated_at': '2017-09-01T10:11:26.585Z',
        'archived_at': null,
        'meta_data': {}
      },
      'relationships': {
        'asset_files': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/variants/2a6f73cc-6568-4b4d-8025-9a55dcc00d70/relationships/asset_files',
            'related': 'http://localhost:5000/pim/v1/variants/2a6f73cc-6568-4b4d-8025-9a55dcc00d70/asset_files'
          }
        }
      }
    },
    {
      'id': '7932b43f-0eba-408c-b5b1-a7ff407d8ebc',
      'type': 'variants',
      'links': {
        'self': 'http://localhost:5000/pim/v1/variants/7932b43f-0eba-408c-b5b1-a7ff407d8ebc'
      },
      'attributes': {
        'sku': '480581489-6',
        'title': 'Small Steel Shirt',
        'created_at': '2017-09-01T10:11:26.581Z',
        'updated_at': '2017-09-01T10:11:26.581Z',
        'archived_at': null,
        'meta_data': {}
      },
      'relationships': {
        'asset_files': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/variants/7932b43f-0eba-408c-b5b1-a7ff407d8ebc/relationships/asset_files',
            'related': 'http://localhost:5000/pim/v1/variants/7932b43f-0eba-408c-b5b1-a7ff407d8ebc/asset_files'
          }
        }
      }
    },
    {
      'id': '27985460-8ad7-4455-bdfd-a9ee107d87bb',
      'type': 'variants',
      'links': {
        'self': 'http://localhost:5000/pim/v1/variants/27985460-8ad7-4455-bdfd-a9ee107d87bb'
      },
      'attributes': {
        'sku': '840763631-2',
        'title': 'Small',
        'created_at': '2017-09-01T10:11:26.516Z',
        'updated_at': '2017-09-01T10:11:26.516Z',
        'archived_at': null,
        'meta_data': {}
      },
      'relationships': {
        'asset_files': {
          'links': {
            'self': 'http://localhost:5000/pim/v1/variants/27985460-8ad7-4455-bdfd-a9ee107d87bb/relationships/asset_files',
            'related': 'http://localhost:5000/pim/v1/variants/27985460-8ad7-4455-bdfd-a9ee107d87bb/asset_files'
          }
        }
      }
    }
  ],
  'meta': {
    'record_count': 3
  },
  'links': {
    'first': 'http://localhost:5000/pim/v1/products?include=variants%2Casset_files&page%5Bnumber%5D=1&page%5Bsize%5D=10',
    'last': 'http://localhost:5000/pim/v1/products?include=variants%2Casset_files&page%5Bnumber%5D=1&page%5Bsize%5D=10'
  }
}
