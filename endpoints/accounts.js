const accounts = (pool) => {
  return async () => {
    const result = await pool.query('SELECT * from accounts')
    return result.rows
  }
}

module.exports = accounts
