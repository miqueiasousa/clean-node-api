const HttpResponse = require('../helpers/http-response')

const factoryLoginRouter = ({ authUseCase, emailValidator } = {}) => ({
  authUseCase,
  emailValidator,
  async route (httpRequest) {
    try {
      if (!this.authUseCase || !this.emailValidator) throw new Error()

      const { email, password } = httpRequest.body

      if (!email || !password) {
        return HttpResponse.status(400).send({ message: 'Bad Request' })
      }

      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.status(400).send({ message: 'Bad Request' })
      }

      const accessToken = await this.authUseCase.auth(email, password)

      if (!accessToken) {
        return HttpResponse.status(401).send({ message: 'Unauthorized' })
      }

      return HttpResponse.status(200).send({
        message: 'OK',
        accessToken
      })
    } catch (error) {
      return HttpResponse.status(500).send({ message: 'Internal server error' })
    }
  }
})

module.exports = factoryLoginRouter
