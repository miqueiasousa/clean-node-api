const EmailValidator = require('./email-validator')
const validator = require('validator')

describe('Email Validator', () => {
  test('Should returns true if validator returns true', () => {
    const sut = EmailValidator
    const isEmailValid = sut.isValid('any@anymail.com')

    expect(isEmailValid).toBe(true)
  })

  test('Should returns false if validator returns false', () => {
    validator.isEmailValid = false

    const sut = EmailValidator
    const isEmailValid = sut.isValid('any@anymail.com')

    expect(isEmailValid).toBe(false)
  })
})
