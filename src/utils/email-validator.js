const validator = require('validator')

const factoryEmailValidator = () => ({
  isValid (email) {
    return validator.isEmail(email)
  }
})

module.exports = factoryEmailValidator()
