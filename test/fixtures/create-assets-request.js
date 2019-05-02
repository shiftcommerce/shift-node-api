module.exports = {
  data: [
    {
      type: 'asset_files',
      attributes: {
        name: 'foo',
        reference: 'img_foo',
        file_remote_url: 'http://example.com/some/path/to/a/file.jpg'
      },
      relationships: {
        asset_folder: {
          type: 'asset_folders',
          attributes: {
            name: 'my folder',
            reference: 'my_folder'
          }
        }
      }
    },
    {
      type: 'asset_files',
      attributes: {
        name: 'foo2',
        reference: 'img_foo2',
        file_remote_url: 'http://example.com/some/path/to/a/different_file.jpg'
      },
      relationships: {
        asset_folder: {
          type: 'asset_folders',
          attributes: {
            name: 'Product Imagery',
            reference: 'product_imagery'
          }
        }
      }
    }
  ],
  meta: {
    permissions: {
      records: {
        asset_files: [
          'create',
          'update'
        ],
        asset_folders: [
          'create',
          'update'
        ]
      }
    }
  }
}
