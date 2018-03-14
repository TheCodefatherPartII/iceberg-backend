const dbQuery = require("../internal/PgClient")

const transactions = (accountId) => {
  return async () => {
    const query = 'SELECT * from transactions where "transactions"."account_id" = $1'
    const params = [accountId]
    // const transactions = dbQuery
    // return [
    //   { timestamp: new Date(), description: "WOOLWORTHS MASCOT", amount: -100, merchant: "Woolworths", lat: 123, lng: -123 },
    //   { timestamp: new Date(), description: "MASCOT DEPOSIT", amount: 100, merchant: null, lat: 123, lng: -123 },
    // ]
    const result = await dbQuery(query, params)
    return result
  }
}

module.exports = transactions
