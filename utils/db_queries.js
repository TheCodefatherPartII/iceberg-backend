const allAccounts = async (pool) => {
  const result = await pool.query('SELECT * from accounts ORDER BY id DESC')
  return result.rows
}

const allAccountTransactions = async (pool, accountId) => {
  const result = await pool.query('SELECT * from transactions where account_id = $1 AND lat IS NOT NULL and lng IS NOT NULL ORDER BY timestamp ASC', [accountId])
  return result.rows
}

const transactionsForEnrichment = async (pool, enrichment_level) => {
  const result = await pool.query('SELECT * FROM transactions WHERE enrichment_level < $1 ORDER BY RANDOM()', [parseInt(enrichment_level, 10)])
  return result.rows
}

const enrichTransaction = async (pool, t) => {
  const result = await pool.query('UPDATE transactions SET lat = $1, lng = $2, enrichment_level=$3 WHERE id = $4', [t.lat, t.lng, t.enrichment_level, t.id])
  return result
}

module.exports = {
  allAccounts,
  allAccountTransactions,
  transactionsForEnrichment,
  enrichTransaction
}
