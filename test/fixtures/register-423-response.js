module.exports = {
  'errors': [
    {
      'title': 'has already been taken',
      'detail': 'email - has already been taken',
      'code': '100',
      'source': {
        'pointer': '/data/attributes/email'
      },
      'status': '422'
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
