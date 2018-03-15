const puppeteer = require('puppeteer')

const waitOptions = { waitUntil: 'networkidle2' }
const rx = /http:\/\/maps\.apple\.com\/\?q=([^,]+),([^"]+)/
const lwcURL = 'https://lookwhoscharging.com/'

const lwcEnricher = async (transaction) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  try {
    await page.goto(lwcURL, waitOptions)
    await page.mainFrame().click('#searchtext', { delay: 185 })
    await page.keyboard.type(transaction.description, { delay: 100 })
    await page.mainFrame().click('#search-button', { delay: 185 })
    await page.waitForNavigation(waitOptions)

    await page.screenshot({path: `/Users/Simez/Downloads/${transaction.id}.png`});
    const content = await page.content()

    // Extract what we need
    const result = content.match(rx)
    if (result && result.length === 3) {
      [_, lat,lng] = result

      if (Math.abs(lat) > 0 && Math.abs(lng) > 0) {
        console.log('LWC enrichment successful for', transaction.description)
        transaction.lat = lat
        transaction.lng = lng
      }
    }

    await browser.close()
  } catch(e) {
    console.log(e)
    await browser.close()
  }


  transaction.enrichment_level = 2
  return transaction
}

module.exports = lwcEnricher
