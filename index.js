const http = require('http')
const parse = require('url').parse
const dbPool = require('./utils/db_pool')

const { serverResponse, errorResponse } = require('./utils/responses')
const { allAccounts, allAccountTransactions } = require('./utils/db_queries')

const portNum = process.env.PORT || 8080

const initialiseWebServer = () => {
  http.createServer((request, response) => {
    console.log('Incoming request for', request.url)

    if (request.url === '/accounts') {
      serverResponse(response, allAccounts(dbPool))
    } else if (request.url.startsWith('/transactions')) {
      let accountId = parse(request.url, true).query.id
      if (accountId) {
        serverResponse(response, allAccountTransactions(dbPool, accountId))
      } else {
        errorResponse(response)
      }
    } else {
      errorResponse(response)
    }
  }).listen(portNum)
}

console.log('Initialising server on port', portNum)
initialiseWebServer()
