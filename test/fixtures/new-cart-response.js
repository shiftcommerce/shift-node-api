module.exports = {
  data: {
    id: '279',
    type: 'carts',
    links: { self: '/reference/v1/carts/279.json_api' },
    attributes:
    {
      meta_attributes: {},
      updated_at: '2019-02-04T10:47:26Z',
      created_at: '2019-02-04T10:47:26Z',
      email: '',
      channel: 'web',
      line_items_count: 1,
      shipping_total_discount: 0,
      shipping_discount_name: null,
      free_shipping: false,
      test: false,
      sub_total: 33.97,
      tax: 5.41,
      total_discount: 1.5,
      total: 32.47,
      shipping_total: 0
    },
    relationships:
    {
      line_items: {},
      discount_summaries: {},
      customer_account: {},
      billing_address: {},
      shipping_address: {},
      shipping_method: {},
      free_shipping_promotion: {},
      applied_promotions: {},
      available_shipping_methods: {},
      available_shipping_promotions: {},
      payment_transactions: {}
    }
  },
  included:
    [{
      id: '791',
      type: 'line_items',
      links: {},
      attributes: {},
      relationships: {}
    },
    {
      id: '261',
      type: 'variants',
      links: {},
      attributes: {},
      relationships: {}
    },
    {
      id: '134',
      type: 'products',
      links: {},
      attributes: {},
      relationships: {}
    },
    {
      id: '0c4ef8bc-b12e-4cdb-a8ba-31f679f3290b',
      type: 'line_item_discounts',
      links: {},
      attributes: {},
      relationships: {}
    },
    {
      id: '73a04dd7-5ef9-48b7-9b26-1a0de6f7ec71',
      type: 'discount_summaries',
      links: {},
      attributes: {}
    }],
  links: { self: '/reference/v1/carts' }
}
