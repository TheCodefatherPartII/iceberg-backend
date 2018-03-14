const allAccounts = async (pool) => {
  const result = await pool.query('SELECT * from accounts')
  return result.rows
}

const allAccountTransactions = async (pool, accountId) => {
  const result = await pool.query('SELECT * from transactions where account_id = $1', [accountId])
  return result.rows
}

const transactionsForEnrichment = async (pool, limit) => {
  const result = await pool.query('SELECT * FROM transactions WHERE enriched IS NULL OR enriched = false LIMIT $1', [parseInt(limit, 10)])
  return result.rows
}

module.exports = {
  allAccounts,
  allAccountTransactions,
  transactionsForEnrichment
}
