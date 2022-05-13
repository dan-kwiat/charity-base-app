const NAME_ES_FIELD = "primaryName"
const ALL_NAMES_ES_FIELD = "names.name"

async function getList(searchSource, { all }) {
  try {
    const _source = all ? [NAME_ES_FIELD, ALL_NAMES_ES_FIELD] : [NAME_ES_FIELD]

    const response = await searchSource({ _source })
    return response.hits.hits.map((doc) => {
      if (!all) {
        return [
          {
            value: doc._source[NAME_ES_FIELD],
            primary: true,
          },
        ]
      }
      let names = [
        {
          value: doc._source[NAME_ES_FIELD],
          primary: true,
        },
      ]
      // `doc._source.names` now represents *other* names (not including `primaryName`)
      if (doc._source.names) {
        doc._source.names.forEach((x) =>
          names.push({
            value: x.name,
            primary: false,
          })
        )
      }
      return names
    })
  } catch (e) {
    throw e
  }
}

module.exports = getList
