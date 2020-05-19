const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return new HttpResponse(500, 'Internal server error')
    }

    const { email, password } = httpRequest.body

    if (!email || !password) {
      return new HttpResponse(400, 'Bad request')
    }
  }
}
