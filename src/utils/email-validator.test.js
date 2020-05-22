const makeEmailValidatorSpy = () => {
  function EmailValidatorSpy () {
    this.isEmailValid = true
    this.isValid = email => {
      return this.isEmailValid
    }
  }

  return new EmailValidatorSpy()
}

describe('Email Validator', () => {
  test('Should returns true if validator returns true', () => {
    const sut = makeEmailValidatorSpy()
    const isEmailValid = sut.isValid('any@anymail.com')

    expect(isEmailValid).toBe(true)
  })
})
