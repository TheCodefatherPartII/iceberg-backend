const dbQuery = require("../internal/PgClient")

const transactions = (accountId) => {
  return async () => {
    const query = 'SELECT * from transactions where "transactions"."account_id" = $1'
    const params = [accountId]
    const result = await dbQuery(query, params)
    return result
  }
}

module.exports = transactions
