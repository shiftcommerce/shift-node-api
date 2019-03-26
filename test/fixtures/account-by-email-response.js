module.exports = {
  'data': {
    'id': '77',
    'type': 'customer_accounts',
    'links': {
      'self': '/reference/v1/customer_accounts/77.json_api'
    },
    'attributes': {
      'meta_attributes': {
        'first_name': {
          'value': 'test',
          'data_type': 'text'
        },
        'last_name': {
          'value': 'tests',
          'data_type': 'text'
        }
      },
      'email': 'testaccount@example.com',
      'reference': '77',
      'created_at': '2019-01-10T14:18:05.924Z',
      'updated_at': '2019-03-05T14:55:20.987Z'
    },
    'relationships': {
      'addresses': {
        'links': {
          'self': '/reference/v1/customer_accounts/77/relationships/addresses.json_api',
          'related': '/reference/v1/customer_accounts/77/addresses.json_api'
        }
      },
      'orders': {
        'links': {
          'self': '/reference/v1/customer_accounts/77/relationships/orders.json_api',
          'related': '/reference/v1/customer_accounts/77/orders.json_api'
        }
      },
      'cart': {
        'links': {
          'self': '/reference/v1/customer_accounts/77/relationships/cart.json_api',
          'related': '/reference/v1/customer_accounts/77/cart.json_api'
        },
        'data': {
          'type': 'carts',
          'id': '516'
        }
      },
      'customer_segments': {
        'links': {
          'self': '/reference/v1/customer_accounts/77/relationships/customer_segments.json_api',
          'related': '/reference/v1/customer_accounts/77/customer_segments.json_api'
        },
        'data': []
      },
      'password_recovery': {
        'links': {
          'self': '/reference/v1/customer_accounts/77/relationships/password_recovery.json_api',
          'related': '/reference/v1/customer_accounts/77/password_recovery.json_api'
        },
        'data': {
          'type': 'password_recoveries',
          'id': 'instance'
        }
      }
    }
  },
  'included': [
    {
      'id': '516',
      'type': 'carts',
      'links': {
        'self': '/reference/v1/carts/516.json_api'
      },
      'attributes': {
        'meta_attributes': {},
        'updated_at': '2019-03-05T14:55:27Z',
        'created_at': '2019-02-28T14:44:50Z',
        'email': '',
        'channel': 'web',
        'line_items_count': 1,
        'shipping_total_discount': -1.95,
        'shipping_discount_name': 'Free Standard Delivery on orders over £10',
        'free_shipping': true,
        'test': false,
        'sub_total': 12.7,
        'tax': 2.12,
        'total_discount': 0.0,
        'total': 12.7,
        'shipping_total': 1.95
      },
      'relationships': {
        'line_items': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/line_items.json_api',
            'related': '/reference/v1/carts/516/line_items.json_api'
          }
        },
        'discount_summaries': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/discount_summaries.json_api',
            'related': '/reference/v1/carts/516/discount_summaries.json_api'
          }
        },
        'customer_account': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/customer_account.json_api',
            'related': '/reference/v1/carts/516/customer_account.json_api'
          }
        },
        'billing_address': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/billing_address.json_api',
            'related': '/reference/v1/carts/516/billing_address.json_api'
          }
        },
        'shipping_address': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/shipping_address.json_api',
            'related': '/reference/v1/carts/516/shipping_address.json_api'
          }
        },
        'shipping_method': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/shipping_method.json_api',
            'related': '/reference/v1/carts/516/shipping_method.json_api'
          }
        },
        'free_shipping_promotion': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/free_shipping_promotion.json_api',
            'related': '/reference/v1/carts/516/free_shipping_promotion.json_api'
          }
        },
        'applied_promotions': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/applied_promotions.json_api',
            'related': '/reference/v1/carts/516/applied_promotions.json_api'
          }
        },
        'available_shipping_methods': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/available_shipping_methods.json_api',
            'related': '/reference/v1/carts/516/available_shipping_methods.json_api'
          }
        },
        'available_shipping_promotions': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/available_shipping_promotions.json_api',
            'related': '/reference/v1/carts/516/available_shipping_promotions.json_api'
          }
        },
        'payment_transactions': {
          'links': {
            'self': '/reference/v1/carts/516/relationships/payment_transactions.json_api',
            'related': '/reference/v1/carts/516/payment_transactions.json_api'
          }
        }
      }
    },
    {
      'id': 'instance',
      'type': 'password_recoveries',
      'links': {
        'self': '/reference/v1/customer_accounts/password_recoveries/instance.json_api'
      },
      'attributes': {
        'token_expired': false,
        'token_present': true,
        'created_at': '2019-03-05T15:47:13.298Z',
        'updated_at': '2019-03-05T15:47:13.298Z'
      }
    }
  ],
  'links': {
    'self': '/reference/v1/customer_accounts/email:testaccount@example.com'
  }
}
