const { Client } = require('pg')
const client = new Client()

const dbQuery = async (query, params) => {
  await client.connect()
  const result = await client.query(query, params)
  await client.end()
  return result.rows
}


module.exports = dbQuery
