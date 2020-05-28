const factoryHttpResponse = () => ({
  status (code) {
    this.statusCode = code

    return this
  },
  send (data) {
    const factoryResponse = (statusCode, body) => ({ statusCode, body })

    return factoryResponse(this.statusCode, data)
  }
})

module.exports = factoryHttpResponse()
