module.exports = {
  data: [
    {
      attributes: {
        asset_file_reference: 'img_foo',
        position: 0,
        product_reference: 'foo',
        reference: 'join_foo_and_img_foo'
      },
      type: 'product_asset_files'
    },
    {
      attributes: {
        asset_file_reference: 'img_bar',
        position: 0,
        product_reference: 'bar',
        reference: 'join_bar_and_img_bar'
      },
      type: 'product_asset_files'
    },
    {
      attributes: {
        asset_file_reference: 'img_bar',
        position: 1,
        product_reference: 'foo',
        reference: 'join_foo_and_img_bar'
      },
      type: 'product_asset_files'
    },
    {
      attributes: {
        asset_file_reference: 'img_bar2',
        position: 1,
        product_reference: 'bar',
        reference: 'join_bar_and_img_bar2'
      },
      type: 'product_asset_files'
    }
  ],
  meta: {
    permissions: { records: { product_asset_files: ['create', 'update'] } }
  }
}
