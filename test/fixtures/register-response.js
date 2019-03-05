module.exports = {
  'data': {
    'id': '85',
    'type': 'customer_accounts',
    'links': {
      'self': '/reference/v1/customer_accounts/85.json_api'
    },
    'attributes': {
      'meta_attributes': {

      },
      'email': 'testing1234@example.com',
      'reference': null,
      'created_at': '2019-02-15T10:54:13.687Z',
      'updated_at': '2019-02-15T10:54:13.687Z'
    },
    'relationships': {
      'addresses': {
        'links': {
          'self': '/reference/v1/customer_accounts/85/relationships/addresses.json_api',
          'related': '/reference/v1/customer_accounts/85/addresses.json_api'
        }
      },
      'orders': {
        'links': {
          'self': '/reference/v1/customer_accounts/85/relationships/orders.json_api',
          'related': '/reference/v1/customer_accounts/85/orders.json_api'
        }
      },
      'cart': {
        'links': {
          'self': '/reference/v1/customer_accounts/85/relationships/cart.json_api',
          'related': '/reference/v1/customer_accounts/85/cart.json_api'
        },
        'data': {
          'type': 'carts',
          'id': '384'
        }
      },
      'customer_segments': {
        'links': {
          'self': '/reference/v1/customer_accounts/85/relationships/customer_segments.json_api',
          'related': '/reference/v1/customer_accounts/85/customer_segments.json_api'
        },
        'data': [

        ]
      },
      'password_recovery': {
        'links': {
          'self': '/reference/v1/customer_accounts/85/relationships/password_recovery.json_api',
          'related': '/reference/v1/customer_accounts/85/password_recovery.json_api'
        }
      }
    }
  },
  'included': [
    {
      'id': '384',
      'type': 'carts',
      'links': {
        'self': '/reference/v1/carts/384.json_api'
      },
      'attributes': {
        'meta_attributes': {

        },
        'updated_at': '2019-02-15T10:54:13Z',
        'created_at': '2019-02-15T10:54:13Z',
        'email': 'testing1234@example.com',
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
            'self': '/reference/v1/carts/384/relationships/line_items.json_api',
            'related': '/reference/v1/carts/384/line_items.json_api'
          }
        },
        'discount_summaries': {
          'links': {
            'self': '/reference/v1/carts/384/relationships/discount_summaries.json_api',
            'related': '/reference/v1/carts/384/discount_summaries.json_api'
          }
        },
        'customer_account': {
          'links': {
            'self': '/reference/v1/carts/384/relationships/customer_account.json_api',
            'related': '/reference/v1/carts/384/customer_account.json_api'
          }
        },
        'billing_address': {
          'links': {
            'self': '/reference/v1/carts/384/relationships/billing_address.json_api',
            'related': '/reference/v1/carts/384/billing_address.json_api'
          }
        },
        'shipping_address': {
          'links': {
            'self': '/reference/v1/carts/384/relationships/shipping_address.json_api',
            'related': '/reference/v1/carts/384/shipping_address.json_api'
          }
        },
        'shipping_method': {
          'links': {
            'self': '/reference/v1/carts/384/relationships/shipping_method.json_api',
            'related': '/reference/v1/carts/384/shipping_method.json_api'
          }
        },
        'free_shipping_promotion': {
          'links': {
            'self': '/reference/v1/carts/384/relationships/free_shipping_promotion.json_api',
            'related': '/reference/v1/carts/384/free_shipping_promotion.json_api'
          }
        },
        'applied_promotions': {
          'links': {
            'self': '/reference/v1/carts/384/relationships/applied_promotions.json_api',
            'related': '/reference/v1/carts/384/applied_promotions.json_api'
          }
        },
        'available_shipping_methods': {
          'links': {
            'self': '/reference/v1/carts/384/relationships/available_shipping_methods.json_api',
            'related': '/reference/v1/carts/384/available_shipping_methods.json_api'
          }
        },
        'available_shipping_promotions': {
          'links': {
            'self': '/reference/v1/carts/384/relationships/available_shipping_promotions.json_api',
            'related': '/reference/v1/carts/384/available_shipping_promotions.json_api'
          }
        },
        'payment_transactions': {
          'links': {
            'self': '/reference/v1/carts/384/relationships/payment_transactions.json_api',
            'related': '/reference/v1/carts/384/payment_transactions.json_api'
          }
        }
      }
    }
  ],
  'meta': {
    'warnings': [
      {
        'title': 'Param not allowed',
        'detail': 'email_confirmation is not allowed.',
        'code': '105'
      },
      {
        'title': 'Param not allowed',
        'detail': 'first_name is not allowed.',
        'code': '105'
      },
      {
        'title': 'Param not allowed',
        'detail': 'last_name is not allowed.',
        'code': '105'
      }
    ]
  },
  'links': {
    'self': '/reference/v1/customer_accounts'
  }
}
