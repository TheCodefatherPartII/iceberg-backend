const serverResponse = (res, dataFunction) => {
  const response = dataFunction()
  console.log(response)

  res.writeHead(200, {'Content-Type': 'application/json'})
  res.write(JSON.stringify(response))
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
