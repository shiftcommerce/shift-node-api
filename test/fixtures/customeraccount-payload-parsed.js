module.exports = {
  status: 201,
  data: {
    addresses: {
      links: {
        related: '/integration/v1/customer_accounts/23063267/addresses.json_api',
        self: '/integration/v1/customer_accounts/23063267/relationships/addresses.json_api'
      }
    },
    cart: {
      applied_promotions: {
        links: {
          related: '/integration/v1/carts/31791629/applied_promotions.json_api',
          self: '/integration/v1/carts/31791629/relationships/applied_promotions.json_api'
        }
      },
      available_shipping_methods: {
        links: {
          related: 'https://devintegrations.shiftstage.com/delivery_options/?shipping_address[address_line_1]=&shipping_address[address_line_2]=&shipping_address[city]=&shipping_address[country]=&shipping_address[first_name]=&shipping_address[last_name]=&shipping_address[postcode]=',
          self: '/integration/v1/carts/31791629/relationships/available_shipping_methods.json_api'
        }
      },
      available_shipping_promotions: {
        links: {
          related: '/integration/v1/carts/31791629/available_shipping_promotions.json_api',
          self: '/integration/v1/carts/31791629/relationships/available_shipping_promotions.json_api'
        }
      },
      billing_address: {
        links: {
          related: '/integration/v1/carts/31791629/billing_address.json_api',
          self: '/integration/v1/carts/31791629/relationships/billing_address.json_api'
        }
      },
      channel: 'web',
      created_at: '2018-08-28T13:57:37Z',
      customer_account: {
        links: {
          related: '/integration/v1/carts/31791629/customer_account.json_api',
          self: '/integration/v1/carts/31791629/relationships/customer_account.json_api'
        }
      },
      discount_summaries: {
        links: {
          related: '/integration/v1/carts/31791629/discount_summaries.json_api',
          self: '/integration/v1/carts/31791629/relationships/discount_summaries.json_api'
        }
      },
      email: 'a.fletcher1234@gmail.com',
      free_shipping: false,
      free_shipping_promotion: {
        links: {
          related: '/integration/v1/carts/31791629/free_shipping_promotion.json_api',
          self: '/integration/v1/carts/31791629/relationships/free_shipping_promotion.json_api'
        }
      },
      id: '31791629',
      line_items: {
        links: {
          related: '/integration/v1/carts/31791629/line_items.json_api',
          self: '/integration/v1/carts/31791629/relationships/line_items.json_api'
        }
      },
      line_items_count: 0,
      meta_attributes: {

      },
      payment_transactions: {
        links: {
          related: '/integration/v1/carts/31791629/payment_transactions.json_api',
          self: '/integration/v1/carts/31791629/relationships/payment_transactions.json_api'
        }
      },
      shipping_address: {
        links: {
          related: '/integration/v1/carts/31791629/shipping_address.json_api',
          self: '/integration/v1/carts/31791629/relationships/shipping_address.json_api'
        }
      },
      shipping_discount_name: null,
      shipping_method: {
        links: {
          related: '/integration/v1/carts/31791629/shipping_method.json_api',
          self: '/integration/v1/carts/31791629/relationships/shipping_method.json_api'
        }
      },
      shipping_total: 0,
      shipping_total_discount: 0,
      sub_total: 0,
      tax: 0,
      test: false,
      total: 0,
      total_discount: 0,
      updated_at: '2018-08-28T13:57:37Z'
    },
    created_at: '2018-08-28T13:57:37.802Z',
    customer_segments: [

    ],
    email: 'a.fletcher1234@gmail.com',
    id: '23063267',
    meta_attributes: {
      first_name: {
        data_type: 'text',
        value: 'a'
      },
      last_name: {
        data_type: 'text',
        value: 'fletcher'
      }
    },
    orders: {
      links: {
        related: 'https://devintegrations.shiftstage.com/orders/?shopatron_customer_id=',
        self: '/integration/v1/customer_accounts/23063267/relationships/orders.json_api'
      }
    },
    password_recovery: {
      links: {
        related: '/integration/v1/customer_accounts/23063267/password_recovery.json_api',
        self: '/integration/v1/customer_accounts/23063267/relationships/password_recovery.json_api'
      }
    },
    reference: null,
    updated_at: '2018-08-28T13:57:37.802Z'
  }
}
