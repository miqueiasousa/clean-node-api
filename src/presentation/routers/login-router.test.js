const LoginRouter = require('./login-router')
const HttpRequest = require('../helpers/http-request')

describe('Login router', () => {
  test('Sould return 400 if no email is provied', () => {
    const sut = new LoginRouter()
    const httpRequest = new HttpRequest({
      body: {
        password: 'querty'
      }
    })
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Sould return 400 if no password is provied', () => {
    const sut = new LoginRouter()
    const httpRequest = new HttpRequest({
      body: {
        email: 'any@any.com'
      }
    })
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Sould return 500 if no httpRequest is provied', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Sould return 500 if httpRequest has no body', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route({})

    expect(httpResponse.statusCode).toBe(500)
  })
})
