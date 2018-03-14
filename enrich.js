const fs = require('fs')
const { red, green } = require('chalk');
const transactions = JSON.parse(fs.readFileSync('data/simon_anz.json', 'utf8'))
const postcodes = JSON.parse(fs.readFileSync('data/postcodes.json', 'utf8'))

const enrich = () => {
  var matchCount = 0
  var noMatchCount = 0

  transactions.forEach((t,i) => {
    const matches = []

    postcodes.forEach((p) => {
      let postcode = p.locality.toUpperCase()
      let description = t.description.toUpperCase()

      if (description.indexOf(postcode) > -1) {
        // TODO: work out how to deal with multiple matches
        matches.push(p.locality)
      }
    })

    if (matches.length === 0) {
      noMatchCount++
    } else {
      matchCount++
    }

    console.log(matches.length == 0 ? red('NO MATCH') : green('MATCH'), "\t" ,t.description)
  })

  console.log('Matched', matchCount, 'out of', transactions.length, '-', Math.floor(matchCount/transactions.length * 100) + '%')
}

enrich()
