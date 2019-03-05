module.exports = {
  'data': [
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0',
      'type': 'order_histories',
      'links': {
        'self': 'http://localhost:4000/oms/v1/order_histories/013affd4-eed2-4fa9-8cad-7a0473368ae0'
      },
      'attributes': {
        'account_reference': 'shiftacc',
        'reference': '6un9U0mdLd',
        'placed_at': '2018-01-01T12:00:00.000Z',
        'meta_attributes': {},
        'pricing': {
          'currency': 'GBP',
          'total_ex_tax': 125900,
          'total_inc_tax': 150600,
          'pre_discount_total_ex_tax': 126600,
          'pre_discount_total_inc_tax': 151440,
          'total_discount_ex_tax': 700,
          'total_discount_inc_tax': 840
        },
        'coupon_codes': [
          '5OFF',
          '3FOR2SOCKS'
        ]
      }
    }
  ],
  'included': [
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0',
      'type': 'customers',
      'links': {
        'self': 'http://localhost:4000/oms/v1/customers/013affd4-eed2-4fa9-8cad-7a0473368ae0'
      },
      'attributes': {
        'reference': 'bob',
        'email': 'test@shiftcommerce.com',
        'name': 'SHIFT',
        'meta_attributes': {}
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_0',
      'type': 'line_items',
      'links': {
        'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0'
      },
      'attributes': {
        'sku': 'WHITE-TSHIRT-XXL',
        'quantity': 5,
        'pricing': {
          'each_ex_tax': 1200,
          'each_inc_tax': 1440,
          'line_ex_tax': 6000,
          'line_inc_tax': 7200,
          'line_discount_ex_tax': 0,
          'line_discount_inc_tax': 0,
          'tax_rate': 12000
        },
        'image_urls': []
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/relationships/order',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/order'
          }
        },
        'shipping_method': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/relationships/shipping_method',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/shipping_method'
          },
          'data': {
            'type': 'shipping_methods',
            'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1'
          }
        },
        'shipping_address': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/relationships/shipping_address',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/shipping_address'
          },
          'data': {
            'type': 'shipping_addresses',
            'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1'
          }
        },
        'discounts': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/relationships/discounts',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/discounts'
          },
          'data': []
        },
        'individual_prices': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/relationships/individual_prices',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/individual_prices'
          },
          'data': []
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1',
      'type': 'line_items',
      'links': {
        'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1'
      },
      'attributes': {
        'sku': 'BLACK-SOCKS-001',
        'quantity': 3,
        'pricing': {
          'each_ex_tax': 200,
          'each_inc_tax': 240,
          'line_ex_tax': 400,
          'line_inc_tax': 480,
          'line_discount_ex_tax': 200,
          'line_discount_inc_tax': 240,
          'tax_rate': 12000
        },
        'image_urls': []
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/order',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/order'
          }
        },
        'shipping_method': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/shipping_method',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/shipping_method'
          },
          'data': {
            'type': 'shipping_methods',
            'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_2'
          }
        },
        'shipping_address': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/shipping_address',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/shipping_address'
          },
          'data': {
            'type': 'shipping_addresses',
            'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_2'
          }
        },
        'discounts': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/discounts',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/discounts'
          },
          'data': [
            {
              'type': 'discounts',
              'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0'
            }
          ]
        },
        'individual_prices': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/individual_prices',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/individual_prices'
          },
          'data': [
            {
              'type': 'individual_prices',
              'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0'
            },
            {
              'type': 'individual_prices',
              'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1'
            },
            {
              'type': 'individual_prices',
              'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2'
            }
          ]
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_2',
      'type': 'line_items',
      'links': {
        'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2'
      },
      'attributes': {
        'sku': 'WHITE-TSHIRT-L',
        'quantity': 1,
        'pricing': {
          'each_ex_tax': 120000,
          'each_inc_tax': 144000,
          'line_ex_tax': 120000,
          'line_inc_tax': 144000,
          'line_discount_ex_tax': 0,
          'line_discount_inc_tax': 0,
          'tax_rate': 12000
        },
        'image_urls': []
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/relationships/order',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/order'
          }
        },
        'shipping_method': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/relationships/shipping_method',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/shipping_method'
          },
          'data': {
            'type': 'shipping_methods',
            'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1'
          }
        },
        'shipping_address': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/relationships/shipping_address',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/shipping_address'
          },
          'data': {
            'type': 'shipping_addresses',
            'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1'
          }
        },
        'discounts': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/relationships/discounts',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/discounts'
          },
          'data': []
        },
        'individual_prices': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/relationships/individual_prices',
            'related': 'http://localhost:4000/oms/v1/line_items/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/individual_prices'
          },
          'data': []
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1',
      'type': 'shipping_methods',
      'links': {
        'self': 'http://localhost:4000/oms/v1/shipping_methods/013affd4-eed2-4fa9-8cad-7a0473368ae0_1'
      },
      'attributes': {
        'label': 'Next Day Delivery',
        'price': 599,
        'meta_attributes': {
          'sku': 'NEXTDAY'
        }
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/shipping_methods/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/order',
            'related': 'http://localhost:4000/oms/v1/shipping_methods/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/order'
          }
        },
        'line_items': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/shipping_methods/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/line_items',
            'related': 'http://localhost:4000/oms/v1/shipping_methods/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/line_items'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_2',
      'type': 'shipping_methods',
      'links': {
        'self': 'http://localhost:4000/oms/v1/shipping_methods/013affd4-eed2-4fa9-8cad-7a0473368ae0_2'
      },
      'attributes': {
        'label': 'Two-man Delivery',
        'price': 2499,
        'meta_attributes': {
          'sku': 'DROPSHIP'
        }
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/shipping_methods/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/relationships/order',
            'related': 'http://localhost:4000/oms/v1/shipping_methods/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/order'
          }
        },
        'line_items': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/shipping_methods/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/relationships/line_items',
            'related': 'http://localhost:4000/oms/v1/shipping_methods/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/line_items'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1',
      'type': 'shipping_addresses',
      'links': {
        'self': 'http://localhost:4000/oms/v1/shipping_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_1'
      },
      'attributes': {
        'name': 'Test Customer',
        'company': 'SHIFT Commerce',
        'lines': [
          'The Calls'
        ],
        'city': 'Leeds',
        'state': 'West Yorkshire',
        'postcode': 'LS2 7EY',
        'country': 'United Kingdom',
        'meta_attributes': {
          'further': 'information'
        }
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/shipping_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/order',
            'related': 'http://localhost:4000/oms/v1/shipping_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/order'
          }
        },
        'line_items': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/shipping_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/line_items',
            'related': 'http://localhost:4000/oms/v1/shipping_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/line_items'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_2',
      'type': 'shipping_addresses',
      'links': {
        'self': 'http://localhost:4000/oms/v1/shipping_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_2'
      },
      'attributes': {
        'name': 'Test Customer 2',
        'company': null,
        'lines': [
          'SHIFT Commerce',
          'The Calls Landing'
        ],
        'city': 'Leeds',
        'state': 'West Yorkshire',
        'postcode': 'LS2 7EY',
        'country': 'United Kingdom',
        'meta_attributes': {
          'further': 'information'
        }
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/shipping_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/relationships/order',
            'related': 'http://localhost:4000/oms/v1/shipping_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/order'
          }
        },
        'line_items': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/shipping_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/relationships/line_items',
            'related': 'http://localhost:4000/oms/v1/shipping_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_2/line_items'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0',
      'type': 'discounts',
      'links': {
        'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0'
      },
      'attributes': {
        'label': '3 for 2 on Socks',
        'amount_ex_tax': 200,
        'amount_inc_tax': 240,
        'coupon_code': '3FOR2SOCKS',
        'meta_attributes': {}
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0/relationships/order',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0/order'
          }
        },
        'line_item': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0/relationships/line_item',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0/line_item'
          }
        },
        'individual_price': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0/relationships/individual_price',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0/individual_price'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0_0',
      'type': 'discounts',
      'links': {
        'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0_0'
      },
      'attributes': {
        'label': '3 for 2 on Socks',
        'amount_ex_tax': 67,
        'amount_inc_tax': 80,
        'coupon_code': null,
        'meta_attributes': {}
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0_0/relationships/order',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0_0/order'
          }
        },
        'line_item': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0_0/relationships/line_item',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0_0/line_item'
          }
        },
        'individual_price': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0_0/relationships/individual_price',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0_0/individual_price'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1_0',
      'type': 'discounts',
      'links': {
        'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1_0'
      },
      'attributes': {
        'label': '3 for 2 on Socks',
        'amount_ex_tax': 67,
        'amount_inc_tax': 80,
        'coupon_code': null,
        'meta_attributes': {}
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1_0/relationships/order',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1_0/order'
          }
        },
        'line_item': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1_0/relationships/line_item',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1_0/line_item'
          }
        },
        'individual_price': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1_0/relationships/individual_price',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1_0/individual_price'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2_0',
      'type': 'discounts',
      'links': {
        'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2_0'
      },
      'attributes': {
        'label': '3 for 2 on Socks',
        'amount_ex_tax': 66,
        'amount_inc_tax': 80,
        'coupon_code': null,
        'meta_attributes': {}
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2_0/relationships/order',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2_0/order'
          }
        },
        'line_item': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2_0/relationships/line_item',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2_0/line_item'
          }
        },
        'individual_price': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2_0/relationships/individual_price',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2_0/individual_price'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_0',
      'type': 'discounts',
      'links': {
        'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_0'
      },
      'attributes': {
        'label': '£5 off orders over £50',
        'amount_ex_tax': 417,
        'amount_inc_tax': 500,
        'coupon_code': '5OFF',
        'meta_attributes': {}
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/relationships/order',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/order'
          }
        },
        'line_item': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/relationships/line_item',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/line_item'
          }
        },
        'individual_price': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/relationships/individual_price',
            'related': 'http://localhost:4000/oms/v1/discounts/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/individual_price'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0',
      'type': 'individual_prices',
      'links': {
        'self': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0'
      },
      'attributes': {
        'ex_tax': 133,
        'inc_tax': 160,
        'discount_ex_tax': 67,
        'discount_inc_tax': 80
      },
      'relationships': {
        'line_item': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0/relationships/line_item',
            'related': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0/line_item'
          }
        },
        'discounts': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0/relationships/discounts',
            'related': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0/discounts'
          },
          'data': [
            {
              'type': 'discounts',
              'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_0_0'
            }
          ]
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1',
      'type': 'individual_prices',
      'links': {
        'self': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1'
      },
      'attributes': {
        'ex_tax': 133,
        'inc_tax': 160,
        'discount_ex_tax': 67,
        'discount_inc_tax': 80
      },
      'relationships': {
        'line_item': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1/relationships/line_item',
            'related': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1/line_item'
          }
        },
        'discounts': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1/relationships/discounts',
            'related': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1/discounts'
          },
          'data': [
            {
              'type': 'discounts',
              'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_1_0'
            }
          ]
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2',
      'type': 'individual_prices',
      'links': {
        'self': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2'
      },
      'attributes': {
        'ex_tax': 134,
        'inc_tax': 160,
        'discount_ex_tax': 66,
        'discount_inc_tax': 80
      },
      'relationships': {
        'line_item': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2/relationships/line_item',
            'related': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2/line_item'
          }
        },
        'discounts': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2/relationships/discounts',
            'related': 'http://localhost:4000/oms/v1/individual_prices/013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2/discounts'
          },
          'data': [
            {
              'type': 'discounts',
              'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1_2_0'
            }
          ]
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_0',
      'type': 'payments',
      'links': {
        'self': 'http://localhost:4000/oms/v1/payments/013affd4-eed2-4fa9-8cad-7a0473368ae0_0'
      },
      'attributes': {
        'mechanism': 'stripe',
        'status': 'authorization',
        'amount': 75840,
        'success': true,
        'response': {
          'token': 'abcdef'
        },
        'meta_attributes': {}
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/payments/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/relationships/order',
            'related': 'http://localhost:4000/oms/v1/payments/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/order'
          }
        },
        'billing_address': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/payments/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/relationships/billing_address',
            'related': 'http://localhost:4000/oms/v1/payments/013affd4-eed2-4fa9-8cad-7a0473368ae0_0/billing_address'
          },
          'data': {
            'type': 'billing_addresses',
            'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1',
      'type': 'payments',
      'links': {
        'self': 'http://localhost:4000/oms/v1/payments/013affd4-eed2-4fa9-8cad-7a0473368ae0_1'
      },
      'attributes': {
        'mechanism': 'gift_card',
        'status': 'authorization',
        'amount': 75840,
        'success': true,
        'response': {
          'token': 'abcdef'
        },
        'meta_attributes': {
          'gift_card_id': '123'
        }
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/payments/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/order',
            'related': 'http://localhost:4000/oms/v1/payments/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/order'
          }
        },
        'billing_address': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/payments/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/billing_address',
            'related': 'http://localhost:4000/oms/v1/payments/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/billing_address'
          },
          'data': {
            'type': 'billing_addresses',
            'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_'
          }
        }
      }
    },
    {
      'id': '013affd4-eed2-4fa9-8cad-7a0473368ae0_1',
      'type': 'billing_addresses',
      'links': {
        'self': 'http://localhost:4000/oms/v1/billing_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_1'
      },
      'attributes': {
        'name': 'Test Customer',
        'company': 'SHIFT Commerce',
        'lines': [
          'The Calls'
        ],
        'city': 'Leeds',
        'state': 'West Yorkshire',
        'postcode': 'LS2 7EY',
        'country': 'United Kingdom',
        'meta_attributes': {
          'further': 'information'
        }
      },
      'relationships': {
        'order': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/billing_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/order',
            'related': 'http://localhost:4000/oms/v1/billing_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/order'
          }
        },
        'payments': {
          'links': {
            'self': 'http://localhost:4000/oms/v1/billing_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/relationships/payments',
            'related': 'http://localhost:4000/oms/v1/billing_addresses/013affd4-eed2-4fa9-8cad-7a0473368ae0_1/payments'
          }
        }
      }
    }
  ],
  'links': {
    'first': 'http://localhost:4000/oms/v1/order_histories?fields%5Border_histories%5D=account_reference%2Creference%2Cplaced_at%2Cmeta_attributes%2Cpricing%2Ccoupon_codes&include=customer%2Cshipping_methods%2Cshipping_addresses%2Cbilling_addresses%2Cdiscounts%2Cline_items.shipping_method%2Cline_items.shipping_address%2Cline_items.discounts%2Cline_items.individual_prices%2Cline_items.individual_prices.discounts%2Cpayments.billing_address&page%5Blimit%5D=10&page%5Boffset%5D=0',
    'last': 'http://localhost:4000/oms/v1/order_histories?fields%5Border_histories%5D=account_reference%2Creference%2Cplaced_at%2Cmeta_attributes%2Cpricing%2Ccoupon_codes&include=customer%2Cshipping_methods%2Cshipping_addresses%2Cbilling_addresses%2Cdiscounts%2Cline_items.shipping_method%2Cline_items.shipping_address%2Cline_items.discounts%2Cline_items.individual_prices%2Cline_items.individual_prices.discounts%2Cpayments.billing_address&page%5Blimit%5D=10&page%5Boffset%5D=0'
  }
}
