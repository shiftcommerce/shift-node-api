const { setCacheHeaders } = require('../../../src/lib/set-cache-headers')
describe('setCacheHeaders', () => {
  test('Adds surrogate key header to the response', () => {
    const response = { headers: { 'external-surrogate-key': 'key_1 key_2 key_3' } }

    setCacheHeaders(response)

    const result = {
      headers: {
        'external-surrogate-key': 'key_1 key_2 key_3',
        'Surrogate-Key': 'key_1 key_2 key_3',
        'Surrogate-Control': 'max-age=3600,stale-if-error=86400,stale-while-revalidate=86400'
      }
    }

    expect(response).toEqual(result)
  })

  test('only adds unique values to surrogate key header', () => {
    const response = { headers: { 'external-surrogate-key': 'key_1 key_2 key_2' } }

    setCacheHeaders(response)

    expect(response.headers['Surrogate-Key']).toEqual('key_1 key_2')
  })

  test('filters menu item keys from external-surrogate-key', () => {
    const response = { headers: { 'external-surrogate-key': 'key_1 key_2 menu_item' } }

    setCacheHeaders(response)

    expect(response.headers['Surrogate-Key']).toEqual('key_1 key_2')
  })
})
