const LoginRouter = require('./login-router')
const HttpRequest = require('../helpers/http-request')

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCaseSpy()
  const emailValidatorSpy = makeEmailValidatorSpy()
  const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy)

  return { sut, authUseCaseSpy, emailValidatorSpy }
}
const makeEmailValidatorSpy = () => {
  function EmailValidatorSpy () {
    this.isEmailValid = true
    this.isValid = email => {
      this.email = email

      return this.isEmailValid
    }
  }

  return new EmailValidatorSpy()
}
const makeAuthUseCaseSpy = () => {
  function AuthUseCaseSpy () {
    this.accessToken = 'token'
    this.auth = async (email, password) => {
      this.email = email
      this.password = password

      return this.accessToken
    }
  }

  return new AuthUseCaseSpy()
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

  test('Sould return 400 if an invalid email is provied', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@#$@any.commmm',
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

  test('Sould return 500 if no EmailValidator is provided', async () => {
    const authUseCaseSpy = makeAuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy)
    const httpRequest = makeHttpRequest({
      body: {
        email: 'any@any.any',
        password: 'qwerty'
      }
    })
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Sould return 500 if EmailValidator has no isValid', async () => {
    const authUseCaseSpy = makeAuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy, {})
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
