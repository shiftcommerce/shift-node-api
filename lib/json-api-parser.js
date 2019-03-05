class JsonApiParser {
  parse (payload) {
    if (Array.isArray(payload.data)) {
      return this.parseCollection(payload)
    } else if (
      typeof payload.data === 'object' &&
      Object.keys(payload.data).length > 0
    ) {
      return this.parseResource(payload)
    }
  }

  parseCollection (payload) {
    const resourceCollection = payload.data
    const includedResources = payload.included
    let parsedResourceCollection = []

    if (resourceCollection.length > 0) {
      resourceCollection.forEach((resource, idx) => {
        parsedResourceCollection.push(
          this.parseResourceData(resource, includedResources)
        )
      })
    }
    return {
      data: parsedResourceCollection,
      pagination: Object.assign({}, payload.meta, payload.links)
    }
  }

  parseResource (payload) {
    const resourceData = payload.data
    const includedResources = payload.included
    let parsedResource = {}

    if (resourceData) {
      parsedResource = this.parseResourceData(resourceData, includedResources)
    }
    return parsedResource
  }

  parseResourceData (resourceData, includedResources) {
    return Object.assign(
      { id: resourceData.id },
      resourceData.attributes,
      this.parseRelationships(resourceData.relationships, includedResources)
    )
  }

  /*
   * Parses Resource Collections contained within the Relationships
   */
  parseRelationships (relationships, includedResources) {
    let parsedRelationships = {}
    if (relationships) {
      Object.entries(relationships).forEach(([key, value]) => {
        if (value.data) {
          if (Array.isArray(value.data)) {
            let resourceIDs = value.data.map(resource => resource.id)
            let resourceType = value.data.length > 0 ? value.data[0].type : ''
            parsedRelationships[key] = this.filterIncludedResources(
              resourceType,
              resourceIDs,
              includedResources
            )
          } else {
            let resourceIDs = value.data.id
            let resourceType = value.data.type
            parsedRelationships[key] = this.filterIncludedResources(
              resourceType,
              resourceIDs,
              includedResources
            )[0]
          }
        } else {
          parsedRelationships[key] = value.data
        }
      })
    }
    return parsedRelationships
  }

  /*
   * Filters Included Resources Based On the Type and ResourceIDs provided
   */
  filterIncludedResources (resourceType, resourceIDs, includedResources) {
    let resources = []
    if (includedResources) {
      includedResources.map((resource, idx) => {
        if (
          resource.type === resourceType &&
          resourceIDs.includes(resource.id)
        ) {
          resources.push(this.parseResourceData(resource, includedResources))
        }
      })
    }
    return resources
  }
}

module.exports = JsonApiParser
