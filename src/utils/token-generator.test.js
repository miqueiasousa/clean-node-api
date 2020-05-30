const TokenGenerator = require('./token-generator')
const jwt = require('jsonwebtoken')

describe('Token Generator', () => {
  test('Should return null if JWT returns null', async () => {
    jwt.token = null

    const sut = TokenGenerator
    const token = await sut.generate('any_data')

    expect(token).toBeNull()
  })

  test('Should return a token if JWT returns token', async () => {
    const sut = TokenGenerator
    const token = await sut.generate('any_data')

    expect(token).toBe(jwt.token)
  })
})
