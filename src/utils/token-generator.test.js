const TokenGenerator = require('./token-generator')

describe('Token Generator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = TokenGenerator
    const token = await sut.generate('any_data')

    expect(token).toBeNull()
  })
})
