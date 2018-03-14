const fs = require('fs')
const { transactionsForEnrichment } = require('./utils/db_queries')

const postcodeEnricher = require('./enrichers/postcode')
const lwcEnricher = require('./enrichers/lwc')
const dbPool = require('./utils/db_pool')

const enrich = async () => {
  const transactions = await transactionsForEnrichment(dbPool, 10)
  transactions.forEach((transaction) => {
    transaction = postcodeEnricher(transaction)
    transaction = lwcEnricher(transaction)
    // TODO: save updated transaction
  })
  process.exit()
}

enrich()
