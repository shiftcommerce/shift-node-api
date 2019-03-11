const Config = require('../../../src/lib/config')

// Make sure the config is reset after each test
afterEach(() => {
  Config.reset()
})

describe('Config', () => {
  it('.get().[key] should return value for key set in config', () => {
    // Check that no keys are set to start off
    expect(Config.config).toEqual({})

    // Set a key and a value to config
    Config.set({
      testKey: 'iamtest'
    })

    // Assert
    expect(Config.get().testKey).toEqual('iamtest')
  })

  it('.reset() should reset the config and return an empty object', () => {
    // Set a key and value to config
    Config.set({
      testKey: 'iamtest'
    })

    // Check config has a key and value set
    expect(Config.config).toEqual({ testKey: 'iamtest' })

    // Call .reset() to clear the config
    Config.reset()

    // Assert
    expect(Config.config).toEqual({})
  })
})