require('events').EventEmitter.prototype._maxListeners = 100;

const fs = require('fs')
const { transactionsForEnrichment, enrichTransaction } = require('./utils/db_queries')

const postcodeEnricher = require('./enrichers/postcode')
const lwcEnricher = require('./enrichers/lwc')
const dbPool = require('./utils/db_pool')

const level1Enrichment = async () => {
  let transactions = await transactionsForEnrichment(dbPool, 1)
  console.log('Retrieved', transactions.length,'records for level 1 enrichment')
  transactions = transactions.map(t => postcodeEnricher(t))
  for (let i = 0; i < transactions.length; i++) {
    let t = transactions[i]
    await enrichTransaction(dbPool, t)
  }
}

const level2Enrichment = async () => {
  let transactions = await transactionsForEnrichment(dbPool, 2)
  console.log('Retrieved', transactions.length,'records for level 2 enrichment')

  for(let i = 0; i < transactions.length; i++) {
    let t = transactions[i]
    t = await lwcEnricher(t)
    await enrichTransaction(dbPool, t)
  }
}

const enrich = async () => {
  await level1Enrichment()
  await level2Enrichment()
  process.exit()
}

enrich()
