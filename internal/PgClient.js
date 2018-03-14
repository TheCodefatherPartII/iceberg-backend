const { Client } = require('pg')
const client = new Client()

client.connect().then(() => {
  client.query('SELECT $1::text as message', ['Hello world!']).then((res) => {
    console.log(res.rows[0].message) // Hello world!
  }).then(() => {
    client.end()
  })
})

module.exports = client
