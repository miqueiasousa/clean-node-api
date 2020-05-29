const Encrypter = require('./encrypter')

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = Encrypter
    const isValid = await sut.compare('password', 'hashed_password')

    expect(isValid).toBe(true)
  })
})
