const fs = require('fs')
const { red, green } = require('chalk');
const postcodes = JSON.parse(fs.readFileSync('data/postcodes.json', 'utf8'))

const postcodeEnricher = (t) => {
  let bestMatchPosition = -1 // Position in transaction description we found a suburb match
  let bestMatchPostcode = {} // Holds best guess of matching postcode
  let description = t.description.toUpperCase()

  postcodes.forEach((p) => {
    if (p.long == 0 || p.lng == 0) return // skip non geo-coded entries

    let postcode = p.locality.toUpperCase()
    let matchPosition = description.indexOf(postcode)

    if (matchPosition > -1) {
      // Prefer matches that are longer in length
      if (postcode.length > (bestMatchPostcode.locality || '').length) {
        bestMatchPosition = matchPosition
        bestMatchPostcode = p
      // If matches are equal in length, prefer the one that occurs later in the transaction description
      } else if (postcode.length === (bestMatchPostcode.locality || '').length && matchPosition > bestMatchPosition) {
        bestMatchPosition = matchPosition
        bestMatchPostcode = p
      }
    }
  })

  if (bestMatchPostcode.locality) {
    t.lat = bestMatchPostcode.lat
    t.lng = bestMatchPostcode.long
    console.log('Best match for', description, 'is', green(bestMatchPostcode.locality), t.lat, t.lng)
  } else {
    console.log(red('No match found for', description))
  }

  return t
}

module.exports = postcodeEnricher
