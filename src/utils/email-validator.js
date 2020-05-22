module.exports = class EmailValidator {
  isEmailValid = true
  email = ''

  validator(email) {
    const test = /([A-z0-9-_.]+)@([A-z0-9-_.]+)\.([A-z]{2,5})/.test(email)

    if (!test) this.isEmailValid = false
  }

  isValid(email) {
    this.email = email

    this.validator(this.email)

    return this.isEmailValid
  }
}
