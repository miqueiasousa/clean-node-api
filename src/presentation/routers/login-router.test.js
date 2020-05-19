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
})
