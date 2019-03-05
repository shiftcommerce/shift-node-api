module.exports = {
  data: {
    id: '6699f1eb-ac8a-442c-87ea-a814affa5389',
    type: 'customer_account_authentications',
    links: {
      self: '/integration/v1/customer_account_authentications/6699f1eb-ac8a-442c-87ea-a814affa5389.json_api'
    },
    attributes: {
      email: 'testing1234@example.com',
      reference: null,
      password: 'qwertyuiop'
    },
    relationships: {
      customer_account: {
        links: {
          self: '/integration/v1/customer_account_authentications/6699f1eb-ac8a-442c-87ea-a814affa5389/relationships/customer_account.json_api',
          related: '/integration/v1/customer_account_authentications/6699f1eb-ac8a-442c-87ea-a814affa5389/customer_account.json_api'
        },
        data: {
          type: 'customer_accounts',
          id: '23063264'
        }
      }
    }
  },
  included: [
    {
      id: '23063264',
      type: 'customer_accounts',
      links: {
        self: '/integration/v1/customer_accounts/23063264.json_api'
      },
      attributes: {
        meta_attributes: {
          first_name: {
            value: 'Testing',
            data_type: 'text'
          },
          last_name: {
            value: '1234',
            data_type: 'text'
          },
          user_hash: {
            value: '00430ad60b0cda0ab470549d310cb6b3f0957703a7d6986a39e786f5e12da26b',
            data_type: 'text'
          }
        },
        email: 'testing1234@example.com',
        reference: '23063264',
        created_at: '2018-08-06T13:36:49.619Z',
        updated_at: '2018-08-06T13:36:49.619Z'
      },
      relationships: {
        addresses: {
          links: {
            self: '/integration/v1/customer_accounts/23063264/relationships/addresses.json_api',
            related: '/integration/v1/customer_accounts/23063264/addresses.json_api'
          }
        },
        orders: {
          links: {
            self: '/integration/v1/customer_accounts/23063264/relationships/orders.json_api',
            related: 'https://devintegrations.shiftstage.com/orders/?shopatron_customer_id='
          }
        },
        cart: {
          links: {
            self: '/integration/v1/customer_accounts/23063264/relationships/cart.json_api',
            related: '/integration/v1/customer_accounts/23063264/cart.json_api'
          }
        },
        customer_segments: {
          links: {
            self: '/integration/v1/customer_accounts/23063264/relationships/customer_segments.json_api',
            related: '/integration/v1/customer_accounts/23063264/customer_segments.json_api'
          }
        },
        password_recovery: {
          links: {
            self: '/integration/v1/customer_accounts/23063264/relationships/password_recovery.json_api',
            related: '/integration/v1/customer_accounts/23063264/password_recovery.json_api'
          }
        }
      }
    }
  ],
  links: {
    self: '/integration/v1/customer_account_authentications'
  }
}
