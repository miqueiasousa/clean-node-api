const Encrypter = require('./encrypter')
const bcrypt = require('bcrypt')

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = Encrypter
    const isValid = await sut.compare('password', 'hashed_password')

    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt returns false', async () => {
    bcrypt.isValid = false

    const sut = Encrypter
    const isValid = await sut.compare('password', 'hashed_password')

    expect(isValid).toBe(false)
  })
})
