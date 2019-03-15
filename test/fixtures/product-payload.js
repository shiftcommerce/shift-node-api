module.exports = {
  'data': {
    'id': 'c51f71ec-3e5e-4305-983a-c8c5b7509ace',
    'type': 'products',
    'links': {
      'self': 'http://172.19.0.1:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace'
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
          'self': 'http://172.19.0.1:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/relationships/variants',
          'related': 'http://172.19.0.1:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/variants'
        },
        'data': [
          { 'type': 'variants', 'id': '27985460-8ad7-4455-bdfd-a9ee107d87bb' }
        ]
      },
      'categories': {
        'links': {
          'self': 'http://172.19.0.1:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/relationships/categories',
          'related': 'http://172.19.0.1:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/categories'
        }
      },
      'asset_files': {
        'links': {
          'self': 'http://172.19.0.1:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/relationships/asset_files',
          'related': 'http://172.19.0.1:5000/pim/v1/products/c51f71ec-3e5e-4305-983a-c8c5b7509ace/asset_files'
        },
        'data': []
      }
    }
  },
  'included': [
    {
      'id': '27985460-8ad7-4455-bdfd-a9ee107d87bb',
      'type': 'variants',
      'links': {
        'self': 'http://172.19.0.1:5000/pim/v1/variants/27985460-8ad7-4455-bdfd-a9ee107d87bb'
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
            'self': 'http://172.19.0.1:5000/pim/v1/variants/27985460-8ad7-4455-bdfd-a9ee107d87bb/relationships/asset_files',
            'related': 'http://172.19.0.1:5000/pim/v1/variants/27985460-8ad7-4455-bdfd-a9ee107d87bb/asset_files'
          }
        }
      }
    }
  ]
}
