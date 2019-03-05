module.exports = {
  data:
    [{
      id: '329',
      meta_attributes: {
        email: {
          data_type: 'text',
          value: 'testaccount@example.com'
        },
        label: {
          data_type: 'text',
          value: 'Home Address'
        },
        phone_number: {
          data_type: 'text',
          value: '07123456789'
        }
      },
      customer_account_id: 77,
      first_name: 'test',
      last_name: 'tests',
      middle_names: '',
      address_line_1: '123 Fakefield',
      address_line_2: '',
      address_line_3: '',
      city: 'Fakefield',
      state: '',
      postcode: 'WF4 4KE',
      country: 'GB',
      preferred_shipping: false,
      preferred_billing: false,
      customer_account: undefined
    }],
  pagination:
  {
    total_entries: 1,
    page_count: 1,
    self: '/reference/v1/customer_accounts/77/addresses',
    first:
      '/reference/v1/addresses.json_api?page%5Bnumber%5D=1&page%5Bsize%5D=25',
    last:
      '/reference/v1/addresses.json_api?page%5Bnumber%5D=1&page%5Bsize%5D=25'
  }
}
