const graphqlFields = require('graphql-fields')
const getElasticQuery = require('./query')
const countCharities = require('./count')
const listCharities = require('./list')
const aggregateCharities = require('./aggregate')

class FilteredCharitiesCHC {
  constructor(filters) {
    this.filters = filters
    this.esQuery = getElasticQuery(filters)
  }
  count() {
    return countCharities(
      this.esQuery,
    )
  }
  list({ limit, skip, sort }, _, info) {
    const requestedFields = graphqlFields(info)
    return listCharities(
      { limit, skip, sort },
      this.esQuery,
      requestedFields
    )
  }
  aggregate(args, _, info) {
    const requestedFields = graphqlFields(info, {}, { processArguments: true })
    return aggregateCharities(
      this.esQuery,
      requestedFields,
    )
  }
}

const getCharities = ({ filters }) => {
  return new FilteredCharitiesCHC(filters)
}

module.exports = getCharities