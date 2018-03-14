const serverResponse = async (res, dataFunction) => {
  const response = await dataFunction()

  // console.log(response)
  // console.log(JSON.stringify(response))
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
