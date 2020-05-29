const LoginRouter = require('./login-router')
const HttpRequest = require('../helpers/http-request')

const factoryEmailValidatorSpy = () => ({
  isEmailValid: true,
  isValid (email) {
    return this.isEmailValid
  }
})

const factoryAuthUseCaseSpy = () => ({
  accessToken: 'token',
  async auth (email, password) {
    return this.accessToken
  }
})

const makeSut = () =>
  LoginRouter({
    emailValidator: factoryEmailValidatorSpy(),
    authUseCase: factoryAuthUseCaseSpy()
  })

describe('Login router', () => {
  test('Sould return 400 if no email is provied', async () => {
    const sut = makeSut()
    const httpRequest = HttpRequest({
      body: {
        password: 'querty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Sould return 400 if an invalid email is provied', async () => {
    const emailValidator = factoryEmailValidatorSpy()

    emailValidator.isEmailValid = false

    const sut = LoginRouter({
      emailValidator,
      authUseCase: factoryAuthUseCaseSpy()
    })
    const httpRequest = HttpRequest({
      body: {
        email: 'any@#$@any.commmm',
        password: 'querty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Sould return 400 if no password is provied', async () => {
    const sut = makeSut()
    const httpRequest = HttpRequest({
      body: {
        email: 'any@any.com'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Sould return 401 when invalid credentials are provided', async () => {
    const authUseCase = factoryAuthUseCaseSpy()

    authUseCase.accessToken = null

    const sut = LoginRouter({
      emailValidator: factoryEmailValidatorSpy(),
      authUseCase
    })
    const httpRequest = HttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(401)
  })

  test('Sould return 200 when valid credentials are provided', async () => {
    const sut = makeSut()
    const httpRequest = HttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toBeTruthy()
  })

  test('Sould return 500 if no dependencies provied', async () => {
    const sut = LoginRouter()
    const httpRequest = HttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })
})
