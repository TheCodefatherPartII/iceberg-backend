const dbQuery = require("../internal/PgClient")

const accounts = () => {
  return async () => {
    const query = 'SELECT * from accounts'
    const params = []
    const result = await dbQuery(query, params)
    return result
  }
}

module.exports = accounts
