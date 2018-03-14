const puppeteer = require('puppeteer')

const waitOptions = { waitUntil: 'networkidle2' }
const rx = /http:\/\/maps\.apple\.com\/\?q=([^,]+),([^"]+)/
const lwcURL = 'https://lookwhoscharging.com/'

const lwcEnricher = async (transaction) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(lwcURL, waitOptions)
  await page.mainFrame().click('#searchtext', { delay: 185 })
  await page.keyboard.type(transaction.description, { delay: 100 })
  await page.mainFrame().click('#search-button', { delay: 185 })
  await page.waitForNavigation(waitOptions)

  // await page.screenshot({path: `${transaction.id}.png`});
  const content = await page.content()

  // Extract what we need
  const [_, lat,lng] = content.match(rx)

  if (Math.abs(lat) > 0 && Math.abs(lng) > 0) {
    console.log('LWC enrichment successful for', transaction.description)
    transaction.lat = lat
    transaction.lng = lng
  }

  return transaction
}

module.exports = lwcEnricher
