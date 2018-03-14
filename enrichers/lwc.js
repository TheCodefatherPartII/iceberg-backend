const puppeteer = require('puppeteer')
const waitOptions = { waitUntil: 'networkidle2' }
const rx = /http:\/\/maps\.apple\.com\/\?q=([^,]+),([^"]+)/

const lwcEnricher = async (transaction) => {
  // Launch the browser
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Go to the LWC homepage
  await page.goto('https://lookwhoscharging.com/', waitOptions)

  // Populate the search field
  await page.mainFrame().click('#searchtext')
  await page.keyboard.type(transaction.description)

  // Submit the page, wait for it to finish loading
  await page.mainFrame().click('#search-button')
  await page.waitForNavigation(waitOptions)

  const content = await page.content()

  // Extract what we need
  const [_, lat,lng] = content.match(rx)

  await browser.close()

  if (Math.abs(lat) > 0 && Math.abs(lng) > 0) {
    transaction.lat = lat
    transaction.lng = lng
  }

  return transaction
}

module.exports = lwcEnricher
