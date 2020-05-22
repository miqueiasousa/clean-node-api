class EmailValidator {
  isEmailValid = true

  isValid(email) {
    return this.isEmailValid
  }
}

const makeSut = () => new EmailValidator()

describe('Email Validator', () => {
  test('Should returns true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('any@anymail.com')

    expect(isEmailValid).toBe(true)
  })

  test('Should returns false if validator returns false', () => {
    const sut = makeSut()
    sut.isEmailValid = false
    const isEmailValid = sut.isValid('any@anymail.com')

    expect(isEmailValid).toBe(false)
  })
})
