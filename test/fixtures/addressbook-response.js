module.exports = {
  'data': [
    {
      'id': '329',
      'type': 'addresses',
      'links': {
        'self': '/reference/v1/addresses/329.json_api'
      },
      'attributes': {
        'meta_attributes': {
          'label': {
            'value': 'Home Address',
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
        'first_name': 'test',
        'last_name': 'tests',
        'middle_names': '',
        'address_line_1': '123 Fakefield',
        'address_line_2': '',
        'address_line_3': '',
        'city': 'Fakefield',
        'state': '',
        'postcode': 'WF4 4KE',
        'country': 'GB',
        'preferred_shipping': false,
        'preferred_billing': false
      },
      'relationships': {
        'customer_account': {
          'links': {
            'self': '/reference/v1/addresses/329/relationships/customer_account.json_api',
            'related': '/reference/v1/addresses/329/customer_account.json_api'
          }
        }
      }
    }
  ],
  'meta': {
    'total_entries': 1,
    'page_count': 1
  },
  'links': {
    'self': '/reference/v1/customer_accounts/77/addresses',
    'first': '/reference/v1/addresses.json_api?page%5Bnumber%5D=1&page%5Bsize%5D=25',
    'last': '/reference/v1/addresses.json_api?page%5Bnumber%5D=1&page%5Bsize%5D=25'
  }
}
