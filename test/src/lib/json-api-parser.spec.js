// Lib
const JsonApiParser = require('../../../src/lib/json-api-parser')

// Fixtures
const productsPayload = require('../../fixtures/products-payload')
const productPayload = require('../../fixtures/product-payload')

describe('JsonApiParser', () => {
  test('it parses a JSON API resource collection correctly', () => {
    // Arrange
    const payloadData = productsPayload.data
    const payloadLinks = productsPayload.links

    // Act
    const { data, pagination } = new JsonApiParser().parse(productsPayload)

    // Assert
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(3)

    expect(pagination.record_count).toBe(3)
    expect(pagination.first).toBe(payloadLinks.first)
    expect(pagination.last).toBe(payloadLinks.last)

    data.forEach((parsedResource, idx) => {
      const payloadResourceData = payloadData[idx]
      const payloadResourceRelationships = payloadResourceData.relationships
      const parsedVariants = parsedResource.variants
      const parsedAssetFiles = parsedResource.asset_files

      expect(parsedResource.id).toBe(payloadResourceData.id)
      expect(parsedResource.title).toBe(payloadResourceData.attributes.title)
      expect(parsedResource.reference).toBe(payloadResourceData.attributes.reference)

      expect(parsedVariants).toBeDefined()
      expect(Array.isArray(parsedVariants)).toBe(true)
      expect(parsedVariants.length).toBe(payloadResourceRelationships.variants.data.length)

      expect(parsedAssetFiles).toBeDefined()
      expect(Array.isArray(parsedAssetFiles)).toBe(true)
      expect(parsedAssetFiles.length).toBe(payloadResourceRelationships.asset_files.data.length)
    })
  })

  test('it parses a JSON API resource correctly', () => {
    // Arrange & Act
    const payloadResourceData = productPayload.data
    const parsedResource = new JsonApiParser().parse(productPayload)
    const parsedVariants = parsedResource.variants
    const parsedAssetFiles = parsedResource.asset_files

    // Assert
    expect(parsedResource.id).toBe(payloadResourceData.id)
    expect(parsedResource.title).toBe(payloadResourceData.attributes.title)
    expect(parsedResource.reference).toBe(payloadResourceData.attributes.reference)

    expect(parsedVariants).toBeDefined()
    expect(Array.isArray(parsedVariants)).toBe(true)
    expect(parsedVariants.length).toBe(1)

    expect(parsedAssetFiles).toBeDefined()
    expect(Array.isArray(parsedAssetFiles)).toBe(true)
    expect(parsedAssetFiles.length).toBe(0)
  })
})
