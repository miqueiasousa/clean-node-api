const HttpResponse = require('../helpers/http-response')

const makeHttpResponse = (statusCode, body) => new HttpResponse(statusCode, body)

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return makeHttpResponse(500, { message: 'Internal server error' })
    }

    const { email, password } = httpRequest.body

    if (!email || !password) {
      return makeHttpResponse(400, { message: 'Bad request' })
    }

    const accessToken = this.authUseCase.auth(email, password)

    if (!accessToken) {
      return makeHttpResponse(401, { message: 'Unauthorized' })
    }

    return makeHttpResponse(200, { message: 'OK', accessToken })
  }
}
