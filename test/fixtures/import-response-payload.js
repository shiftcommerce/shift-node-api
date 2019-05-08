module.exports = {
  data: {
    id: '101',
    type: 'imports',
    links: {
      self: '/trendygolf/v1/imports/101.json_api',
      entries: '/trendygolf/v1/imports/101/import_entries.json_api',
      processed_entries: '/trendygolf/v1/imports/101/import_entries.json_api?filter%5Bstatus%5D=success',
      failed_entries: '/trendygolf/v1/imports/101/import_entries.json_api?filter%5Bstatus%5D=failed'
    },
    attributes: {
      updated_at: '2019-05-01T12:52:04Z',
      created_at: '2019-05-01T12:52:02Z',
      status: 'processed',
      importer_type: 'ProductAssetFiles',
      processing_errors: [],
      processed_entries: 1,
      failed_entries: 0,
      total_entries: 1
    },
    relationships: {
      entries: {
        links: {
          self: '/trendygolf/v1/imports/101/relationships/entries.json_api',
          related: '/trendygolf/v1/imports/101/entries.json_api'
        }
      },
      import_entries: {
        links: {
          self: '/trendygolf/v1/imports/101/relationships/import_entries.json_api',
          related: '/trendygolf/v1/imports/101/import_entries.json_api'
        }
      }
    },
    meta: {
      status: 'processed',
      importer_type: 'ProductAssetFiles',
      processing_errors: [],
      processed_entries: 1,
      failed_entries: 0,
      total_entries: 1,
      created_at: '2019-05-01T12:52:02Z',
      updated_at: '2019-05-01T12:52:04Z'
    }
  },
  meta: {
    status: 'processed',
    importer_type: 'ProductAssetFiles',
    processing_errors: [],
    processed_entries: 1,
    failed_entries: 0,
    total_entries: 1,
    created_at: '2019-05-01T12:52:02Z',
    updated_at: '2019-05-01T12:52:04Z'
  },
  links: {
    self: '/trendygolf/v1/imports/101.json_api',
    entries: '/trendygolf/v1/imports/101/import_entries.json_api',
    processed_entries: '/trendygolf/v1/imports/101/import_entries.json_api?filter%5Bstatus%5D=success',
    failed_entries: '/trendygolf/v1/imports/101/import_entries.json_api?filter%5Bstatus%5D=failed'
  }
}
