const http = require('http')
const parse = require('url').parse

const accounts = require('./endpoints/accounts')
const transactions = require('./endpoints/transactions')
const { serverResponse, errorResponse } = require('./utils/responses')

const portNum = process.env.PORT || 8080

const initialiseWebServer = () => {
  http.createServer((request, response) => {
    console.log('Incoming request for', request.url)

    if (request.url === '/accounts') {
      serverResponse(response, accounts)
    } else if (request.url.startsWith('/transactions')) {
      let accountId = parse(request.url, true).query.id
      if (accountId) {
        serverResponse(response, transactions(accountId))
      } else {
        errorResponse(response)
      }
    } else {
      errorResponse()
    }
  }).listen(portNum)
}

console.log('Initialising server on port', portNum)
initialiseWebServer()
