module.exports = {
  'data': {
    'id': '372',
    'type': 'addresses',
    'links': {
      'self': '/reference/v1/addresses/372.json_api'
    },
    'attributes': {
      'meta_attributes': {
        'label': {
          'value': 'Paw address',
          'data_type': 'text'
        },
        'phone_number': {
          'value': '07123456789',
          'data_type': 'text'
        },
        'email': {
          'value': 'testaccount@example.com',
          'data_type': 'text'
        }
      },
      'customer_account_id': 77,
      'first_name': 'Test',
      'last_name': 'Testing',
      'middle_names': '',
      'address_line_1': '123 Fakeroad',
      'address_line_2': '',
      'address_line_3': '',
      'city': 'Fakefield',
      'state': null,
      'postcode': 'WF4 4KE',
      'country': 'GB',
      'preferred_shipping': false,
      'preferred_billing': false
    },
    'relationships': {
      'customer_account': {
        'links': {
          'self': '/reference/v1/addresses/372/relationships/customer_account.json_api',
          'related': '/reference/v1/addresses/372/customer_account.json_api'
        }
      }
    }
  },
  'meta': {
    'warnings': [
      {
        'title': 'Param not allowed',
        'detail': 'id is not allowed.',
        'code': '105'
      }
    ]
  },
  'links': {
    'self': '/reference/v1/customer_accounts/77/addresses'
  }
}
