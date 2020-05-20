module.exports = class HttpResponse {
  constructor (statusCode, body) {
    this.statusCode = statusCode
    this.body = body
  }
}
