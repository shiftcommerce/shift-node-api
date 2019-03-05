module.exports = async (_globalConfig) => {
  // Environment variables expected by the package
  process.env.API_HOST = 'http://example.com'
  process.env.API_TENANT = 'test_tenant'
}
