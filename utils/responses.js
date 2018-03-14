const serverResponse = async (res, result) => {
  const data = await result
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.write(JSON.stringify(data))
  res.end()
}

const errorResponse = (response) => {
  response.writeHead(404)
  response.write('Page not found')
  response.end()
}

module.exports = {
  serverResponse,
  errorResponse
}
