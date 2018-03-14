const transactions = (pool, accountId) => {
  return async () => {
    const result = await pool.query('SELECT * from transactions where "transactions"."account_id" = $1', [accountId])
    return result.rows
  }
}

module.exports = transactions
