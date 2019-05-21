// A function that sets CDN headers

function setCacheHeaders (response) {
  // fastly limit of 16,384 bytes is equal to 16384 utf-8 characters
  const lengthLimit = 16384

  if (response.headers['external-surrogate-key']) {
    // extract surrogate keys
    const externalSurrogateKeys = response.headers['external-surrogate-key'].split(' ').filter(uniq).join(' ')
    const surrogateKeys = externalSurrogateKeys.split(' ').filter(word => !word.match('menu_item')).join(' ')

    // set surrogate headers
    response.headers['Surrogate-Key'] = surrogateKeys
    response.headers['Surrogate-Control'] = 'max-age=3600,stale-if-error=86400,stale-while-revalidate=86400'

    // print a warning when surrogate keys exceed limit
    if (surrogateKeys.length > lengthLimit) {
      console.log('Warning: The following Surrogate keys have exceeded the fastly length limit:', surrogateKeys)
    }
  }
}

// function to filter unique values
function uniq (value, index, self) {
  return self.indexOf(value) === index
}

module.exports = { setCacheHeaders }
