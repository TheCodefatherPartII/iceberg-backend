require('events').EventEmitter.prototype._maxListeners = 100;

const fs = require('fs')
const { transactionsForEnrichment, enrichTransaction } = require('./utils/db_queries')

const postcodeEnricher = require('./enrichers/postcode')
const lwcEnricher = require('./enrichers/lwc')
const dbPool = require('./utils/db_pool')

const enrich = async () => {
  let transactions = await transactionsForEnrichment(dbPool, 10000)

  transactions = transactions.map(t => postcodeEnricher(t))

  for(let x = 0; x < transactions.length; x++) {
    let t = transactions[x]
    t = await lwcEnricher(t)
    await enrichTransaction(dbPool, t)
  }

  process.exit()
}

enrich()
