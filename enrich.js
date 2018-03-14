require('events').EventEmitter.prototype._maxListeners = 100;

const fs = require('fs')
const { transactionsForEnrichment, enrichTransaction } = require('./utils/db_queries')

const postcodeEnricher = require('./enrichers/postcode')
const lwcEnricher = require('./enrichers/lwc')
const dbPool = require('./utils/db_pool')

const enrich = async () => {
  let transactions = await transactionsForEnrichment(dbPool, 100)

  transactions = transactions.map(t => postcodeEnricher(t))
  console.log('Postcode enrichment completed')

  transactions = transactions.map(async t => await lwcEnricher(t))
  console.log('LWC enrichment completed')

  transactions.forEach(async t => await enrichTransaction(dbPool, t))
  console.log('Enrichment process completed')

  process.exit()
}

enrich()
