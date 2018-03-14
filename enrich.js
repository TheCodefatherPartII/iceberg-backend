const fs = require('fs')
const transactions = JSON.parse(fs.readFileSync('data/simon_anz.json', 'utf8'))

const postcodeEnricher = require('./enrichers/postcode')
const lwcEnricher = require('./enrichers/lwc')

const enrich = () => {
  transactions.forEach((transaction) => {
    transaction = postcodeEnricher(transaction)
    transaction = lwcEnricher(transaction)
    // TODO: save updated transaction
  })
}

enrich()
