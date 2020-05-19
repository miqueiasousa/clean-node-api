module.exports = class HttpResponse {
  constructor (statusCode, message, data) {
    this.statusCode = statusCode
    this.message = message
    this.data = data || []
  }
}
