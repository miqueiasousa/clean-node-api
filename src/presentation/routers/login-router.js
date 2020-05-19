const HttpResponse = require('../helpers/http-response')

const makeHttpResponse = req => new HttpResponse(req)

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return makeHttpResponse(500, 'Internal server error')
    }

    const { email, password } = httpRequest.body

    if (!email || !password) {
      return makeHttpResponse(400, 'Bad request')
    }

    this.authUseCase.auth(email, password)

    return makeHttpResponse(401, 'Unauthorized')
  }
}
