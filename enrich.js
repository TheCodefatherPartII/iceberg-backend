const fs = require('fs')
const { transactionsForEnrichment, enrichTransaction } = require('./utils/db_queries')

const postcodeEnricher = require('./enrichers/postcode')
const lwcEnricher = require('./enrichers/lwc')
const dbPool = require('./utils/db_pool')

const enrich = async () => {
  const transactions = await transactionsForEnrichment(dbPool, 1000)
  const promises = transactions.map(async (transaction) => {
    transaction = postcodeEnricher(transaction)
    transaction = lwcEnricher(transaction)
    await enrichTransaction(dbPool, transaction)
  })
  await Promise.all(promises)
  process.exit()
}

enrich()
