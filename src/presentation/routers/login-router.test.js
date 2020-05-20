const LoginRouter = require('./login-router')
const HttpRequest = require('../helpers/http-request')

const makeSut = () => {
  function AuthUseCaseSpy () {
    this.auth = async (email, password) => {
      this.email = email
      this.password = password

      return this.accessToken
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy()

  authUseCaseSpy.accessToken = 'token'

  const sut = new LoginRouter(authUseCaseSpy)

  return { sut, authUseCaseSpy }
}
const makeHttpRequest = req => new HttpRequest(req)

describe('Login router', () => {
  test('Sould return 400 if no email is provied', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({
      body: {
        password: 'querty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Sould return 400 if no password is provied', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@any.com'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Sould return 500 if no httpRequest is provied', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Sould return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Sould call AuthUseCase with correct params', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })

    await sut.route(httpRequest)

    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Sould return 401 when invalid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.accessToken = null
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(401)
  })

  test('Sould return 200 when valid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken)
  })

  test('Sould return 500 if no AuthUseCase is provided', async () => {
    const sut = new LoginRouter()
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Sould return 500 if AuthUseCase has no auth', async () => {
    const sut = new LoginRouter({})
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })
})
