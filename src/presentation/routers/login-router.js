const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return new HttpResponse(500, 'Internal server error')
    }

    const { email, password } = httpRequest.body

    if (!email || !password) {
      return new HttpResponse(400, 'Bad request')
    }

    this.authUseCase.auth(email, password)
  }
}
