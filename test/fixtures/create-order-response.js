module.exports = {
  data: {
    id: '74',
    type: 'create_order',
    links: { self: '/reference/v2/create_order/74.json_api' },
    attributes: {
      email: 'guest@order.com',
      channel: 'web',
      shipping_discount_name: null,
      free_shipping: false,
      reference: '_74_',
      status: 'pending',
      deallocated_at: null,
      deallocated: false,
      coupons_applied: [],
      ip_address: '1.1.1.1',
      shipping_address: {},
      billing_address: {},
      customer_account_id: null,
      shipping_method: {},
      currency: 'GBP',
      discount_summaries: [],
      test: true,
      placed_at: '2018-10-31T14:37:34.113Z',
      shipping_discount: 0,
      total: 19.45,
      sub_total: 19.45,
      shipping_total: 0,
      tax: 0
    },
    relationships: {
      line_items: {},
      payment_transactions: {}
    }
  }
}