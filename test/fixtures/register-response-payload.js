module.exports = {
  data: {
    id: '23063267',
    type: 'customer_accounts',
    links: {
      self: '/integration/v1/customer_accounts/23063267.json_api'
    },
    attributes: {
      meta_attributes: {
        first_name: {
          value: 'a',
          data_type: 'text'
        },
        last_name: {
          value: 'fletcher',
          data_type: 'text'
        }
      },
      email: 'a.fletcher1234@gmail.com',
      reference: null,
      created_at: '2018-08-28T13:57:37.802Z',
      updated_at: '2018-08-28T13:57:37.802Z'
    },
    relationships: {
      addresses: {
        links: {
          self: '/integration/v1/customer_accounts/23063267/relationships/addresses.json_api',
          related: '/integration/v1/customer_accounts/23063267/addresses.json_api'
        }
      },
      orders: {
        links: {
          self: '/integration/v1/customer_accounts/23063267/relationships/orders.json_api',
          related: 'https://devintegrations.shiftstage.com/orders/?shopatron_customer_id='
        }
      },
      cart: {
        links: {
          self: '/integration/v1/customer_accounts/23063267/relationships/cart.json_api',
          related: '/integration/v1/customer_accounts/23063267/cart.json_api'
        },
        data: {
          type: 'carts',
          id: '31791629'
        }
      },
      customer_segments: {
        links: {
          self: '/integration/v1/customer_accounts/23063267/relationships/customer_segments.json_api',
          related: '/integration/v1/customer_accounts/23063267/customer_segments.json_api'
        },
        data: []
      },
      password_recovery: {
        links: {
          self: '/integration/v1/customer_accounts/23063267/relationships/password_recovery.json_api',
          related: '/integration/v1/customer_accounts/23063267/password_recovery.json_api'
        }
      }
    }
  },
  included: [
    {
      id: '31791629',
      type: 'carts',
      links: {
        self: '/integration/v1/carts/31791629.json_api'
      },
      attributes: {
        meta_attributes: {},
        updated_at: '2018-08-28T13:57:37Z',
        created_at: '2018-08-28T13:57:37Z',
        email: 'a.fletcher1234@gmail.com',
        channel: 'web',
        line_items_count: 0,
        shipping_total_discount: 0,
        shipping_discount_name: null,
        free_shipping: false,
        test: false,
        sub_total: 0,
        tax: 0,
        total_discount: 0,
        total: 0,
        shipping_total: 0
      },
      relationships: {
        line_items: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/line_items.json_api',
            related: '/integration/v1/carts/31791629/line_items.json_api'
          }
        },
        discount_summaries: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/discount_summaries.json_api',
            related: '/integration/v1/carts/31791629/discount_summaries.json_api'
          }
        },
        customer_account: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/customer_account.json_api',
            related: '/integration/v1/carts/31791629/customer_account.json_api'
          }
        },
        billing_address: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/billing_address.json_api',
            related: '/integration/v1/carts/31791629/billing_address.json_api'
          }
        },
        shipping_address: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/shipping_address.json_api',
            related: '/integration/v1/carts/31791629/shipping_address.json_api'
          }
        },
        shipping_method: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/shipping_method.json_api',
            related: '/integration/v1/carts/31791629/shipping_method.json_api'
          }
        },
        free_shipping_promotion: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/free_shipping_promotion.json_api',
            related: '/integration/v1/carts/31791629/free_shipping_promotion.json_api'
          }
        },
        applied_promotions: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/applied_promotions.json_api',
            related: '/integration/v1/carts/31791629/applied_promotions.json_api'
          }
        },
        available_shipping_methods: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/available_shipping_methods.json_api',
            related: 'https://devintegrations.shiftstage.com/delivery_options/?shipping_address[address_line_1]=&shipping_address[address_line_2]=&shipping_address[city]=&shipping_address[country]=&shipping_address[first_name]=&shipping_address[last_name]=&shipping_address[postcode]='
          }
        },
        available_shipping_promotions: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/available_shipping_promotions.json_api',
            related: '/integration/v1/carts/31791629/available_shipping_promotions.json_api'
          }
        },
        payment_transactions: {
          links: {
            self: '/integration/v1/carts/31791629/relationships/payment_transactions.json_api',
            related: '/integration/v1/carts/31791629/payment_transactions.json_api'
          }
        }
      }
    }
  ],
  meta: {
    warnings: [
      {
        title: 'Param not allowed',
        detail: 'email_confirmation is not allowed.',
        code: '105'
      },
      {
        title: 'Param not allowed',
        detail: 'password_confirmation is not allowed.',
        code: '105'
      }
    ]
  },
  links: {
    self: '/integration/v1/customer_accounts'
  }
}
