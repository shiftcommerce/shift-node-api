const HTTPClient = require('../http-client')

const bulkHeaders = {
  'Content-Type': 'application/vnd.api+json; ext=bulk',
  'Accept': 'application/vnd.api+json; ext=bulk'
}

/**
 * Bulk add assets
 *
 * @param [{ name, reference, remote_file_url, asset_folder: { name, reference } }] assets
 */
function createAssetsFilesV1 (assets) {
  const data = assets.map(asset => {
    return {
      type: 'asset_files',
      attributes: {
        name: asset.name,
        reference: asset.reference,
        file_remote_url: asset.remote_file_url
      },
      relationships: {
        asset_folder: {
          type: 'asset_folders',
          attributes: {
            name: asset.folder.name,
            reference: asset.folder.reference
          }
        }
      }
    }
  })

  const payload = {
    data: data,
    meta: {
      permissions: {
        records: {
          asset_files: [ 'create', 'update' ],
          asset_folders: [ 'create', 'update' ]
        }
      }
    }
  }

  return HTTPClient.post('v1/asset_files', payload, bulkHeaders).then(response => {
    return {
      status: response.status,
      data: response.data
    }
  })
}

/**
 * Bulk add mapping between asset files and products
 *
 * @param [{ product_reference, asset_file_reference, position }] req
 */
function createProductAssetFilesV1 (mappings) {
  const data = mappings.map(mapping => {
    return {
      type: 'product_asset_files',
      attributes: {
        position: mapping.position,
        reference: 'join_' + mapping.product_reference + '_and_' + mapping.asset_file_reference,
        product_reference: mapping.product_reference,
        asset_file_reference: mapping.asset_file_reference
      }
    }
  })

  const payload = {
    data: data,
    meta: {
      permissions: {
        records: {
          product_asset_files: [ 'create', 'update' ]
        }
      }
    }
  }
  return HTTPClient.post('v1/product_asset_files', payload, bulkHeaders).then(response => {
    return {
      status: response.status,
      data: response.data
    }
  })
}

module.exports = {
  createAssetsFilesV1,
  createProductAssetFilesV1
}
