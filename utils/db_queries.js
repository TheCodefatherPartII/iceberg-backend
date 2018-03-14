const allAccounts = async (pool) => {
  const result = await pool.query('SELECT * from accounts')
  return result.rows
}

const allAccountTransactions = async (pool, accountId) => {
  const result = await pool.query('SELECT * from transactions where account_id = $1 AND lat IS NOT NULL and lng IS NOT NULL', [accountId])
  return result.rows
}

const transactionsForEnrichment = async (pool, limit) => {
  const result = await pool.query('SELECT * FROM transactions WHERE enriched IS NULL OR enriched = false ORDER BY RANDOM() LIMIT $1', [parseInt(limit, 10)])
  return result.rows
}

const enrichTransaction = async (pool, t) => {
  const result = await pool.query('UPDATE transactions SET lat = $1, lng = $2, enriched=true WHERE id = $3', [t.lat, t.lng, t.id])
  return result
}

module.exports = {
  allAccounts,
  allAccountTransactions,
  transactionsForEnrichment,
  enrichTransaction
}
