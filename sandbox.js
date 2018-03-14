// const { Client } = require('pg')
// const client = new Client()

// console.log("Hello")
// // client.query('SELECT NOW() as now', (err, res) => {
// //   if (err) {
// //     console.log(err.stack)
// //     console.log(err)
// //     console.log("Got here instead")
// //   } else {
// //     console.log(res.rows[0])
// //     console.log(res)
// //     console.log("Got here")
// //   }
// // })

// // client.end()
// // client.query('SELECT NOW() as now')
// //   .then(res => console.log(res.rows[0]))
// //   .catch(e => console.error(e.stack))


// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

// console.log("Goodbye")

const { Client } = require('pg')
const client = new Client()

client.connect().then(() => {
  const Query = 'SELECT NOW()'
  client.query(Query).then((res) => {
    // console.log(res.rows[0].message) // Hello world!
    console.log(res.rows[0].now)
  }).then(() => {
    client.end()
  })
})

module.exports = client
