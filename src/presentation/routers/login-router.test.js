const LoginRouter = require('./login-router')
const HttpRequest = require('../helpers/http-request')

const makeSut = () => {
  function AuthUseCaseSpy () {
    this.auth = (email, password) => {
      this.email = email
      this.password = password
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)

  return { sut, authUseCaseSpy }
}
const makeHttpRequest = req => new HttpRequest(req)

describe('Login router', () => {
  test('Sould return 400 if no email is provied', () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({
      body: {
        password: 'querty'
      }
    })
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Sould return 400 if no password is provied', () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@any.com'
      }
    })
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Sould return 500 if no httpRequest is provied', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Sould return 500 if httpRequest has no body', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route({})

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Sould call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })

    sut.route(httpRequest)

    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Sould return 401 when invalid credentials are provided', () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(401)
  })
})
