const HttpResponse = require('../helpers/http-response')

const makeHttpResponse = (statusCode, body) => new HttpResponse(statusCode, body)

module.exports = class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body

      if (!email || !password) {
        return makeHttpResponse(400, { message: 'Bad request' })
      }

      if (!this.emailValidator.isValid(email)) {
        return makeHttpResponse(400, { message: 'Bad request' })
      }

      const accessToken = await this.authUseCase.auth(email, password)

      if (!accessToken) {
        return makeHttpResponse(401, { message: 'Unauthorized' })
      }

      return makeHttpResponse(200, { message: 'OK', accessToken })
    } catch (error) {
      return makeHttpResponse(500, { message: 'Internal server error' })
    }
  }
}
