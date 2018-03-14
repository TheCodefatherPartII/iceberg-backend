const fs = require('fs')
const { transactionsForEnrichment, enrichTransaction } = require('./utils/db_queries')

const postcodeEnricher = require('./enrichers/postcode')
const lwcEnricher = require('./enrichers/lwc')
const dbPool = require('./utils/db_pool')

const enrich = async () => {
  const transactions = await transactionsForEnrichment(dbPool, 10)
  const promises = transactions.map(async (t) => {
    t = postcodeEnricher(t)
    console.log('Postcode enricher', t.description, t.lat, t.lng)
    t = await lwcEnricher(t)
    console.log('LWC enricher', t.description, t.lat, t.lng)
    await enrichTransaction(dbPool, t)
  })
  await Promise.all(promises)
  process.exit()
}

enrich()
