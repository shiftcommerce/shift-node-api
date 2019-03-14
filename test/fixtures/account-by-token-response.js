module.exports = {
  'data': {
    'id': '102',
    'type': 'customer_accounts',
    'links': {
      'self': '/reference/v1/customer_accounts/102.json_api'
    },
    'attributes': {
      'meta_attributes': {
        'first_name': {
          'value': 'test',
          'data_type': 'text'
        },
        'last_name': {
          'value': 'testing',
          'data_type': 'text'
        }
      },
      'email': 'arhorner1@gmail.com',
      'reference': '102',
      'created_at': '2019-03-06T14:54:12.341Z',
      'updated_at': '2019-03-06T16:30:53.874Z'
    },
    'relationships': {
      'addresses': {
        'links': {
          'self': '/reference/v1/customer_accounts/102/relationships/addresses.json_api',
          'related': '/reference/v1/customer_accounts/102/addresses.json_api'
        }
      },
      'orders': {
        'links': {
          'self': '/reference/v1/customer_accounts/102/relationships/orders.json_api',
          'related': '/reference/v1/customer_accounts/102/orders.json_api'
        }
      },
      'cart': {
        'links': {
          'self': '/reference/v1/customer_accounts/102/relationships/cart.json_api',
          'related': '/reference/v1/customer_accounts/102/cart.json_api'
        },
        'data': {
          'type': 'carts',
          'id': '576'
        }
      },
      'customer_segments': {
        'links': {
          'self': '/reference/v1/customer_accounts/102/relationships/customer_segments.json_api',
          'related': '/reference/v1/customer_accounts/102/customer_segments.json_api'
        },
        'data': []
      },
      'password_recovery': {
        'links': {
          'self': '/reference/v1/customer_accounts/102/relationships/password_recovery.json_api',
          'related': '/reference/v1/customer_accounts/102/password_recovery.json_api'
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
      'id': '576',
      'type': 'carts',
      'links': {
        'self': '/reference/v1/carts/576.json_api'
      },
      'attributes': {
        'meta_attributes': {},
        'updated_at': '2019-03-06T14:54:12Z',
        'created_at': '2019-03-06T14:54:12Z',
        'email': 'arhorner1@gmail.com',
        'channel': 'web',
        'line_items_count': 0,
        'shipping_total_discount': 0.0,
        'shipping_discount_name': null,
        'free_shipping': false,
        'test': false,
        'sub_total': 0.0,
        'tax': 0.0,
        'total_discount': 0.0,
        'total': 0.0,
        'shipping_total': 0.0
      },
      'relationships': {
        'line_items': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/line_items.json_api',
            'related': '/reference/v1/carts/576/line_items.json_api'
          }
        },
        'discount_summaries': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/discount_summaries.json_api',
            'related': '/reference/v1/carts/576/discount_summaries.json_api'
          }
        },
        'customer_account': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/customer_account.json_api',
            'related': '/reference/v1/carts/576/customer_account.json_api'
          }
        },
        'billing_address': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/billing_address.json_api',
            'related': '/reference/v1/carts/576/billing_address.json_api'
          }
        },
        'shipping_address': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/shipping_address.json_api',
            'related': '/reference/v1/carts/576/shipping_address.json_api'
          }
        },
        'shipping_method': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/shipping_method.json_api',
            'related': '/reference/v1/carts/576/shipping_method.json_api'
          }
        },
        'free_shipping_promotion': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/free_shipping_promotion.json_api',
            'related': '/reference/v1/carts/576/free_shipping_promotion.json_api'
          }
        },
        'applied_promotions': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/applied_promotions.json_api',
            'related': '/reference/v1/carts/576/applied_promotions.json_api'
          }
        },
        'available_shipping_methods': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/available_shipping_methods.json_api',
            'related': '/reference/v1/carts/576/available_shipping_methods.json_api'
          }
        },
        'available_shipping_promotions': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/available_shipping_promotions.json_api',
            'related': '/reference/v1/carts/576/available_shipping_promotions.json_api'
          }
        },
        'payment_transactions': {
          'links': {
            'self': '/reference/v1/carts/576/relationships/payment_transactions.json_api',
            'related': '/reference/v1/carts/576/payment_transactions.json_api'
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
        'created_at': '2019-03-06T16:32:23.026Z',
        'updated_at': '2019-03-06T16:32:23.026Z'
      }
    }
  ],
  'links': {
    'self': '/reference/v1/customer_accounts/token:S2sa1wQTZVxWy_f4_T8p'
  }
}
