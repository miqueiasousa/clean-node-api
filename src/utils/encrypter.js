const bcrypt = require('bcrypt')

const factoryEncrypter = () => ({
  async compare (value, hashedvalue) {
    const isValid = await bcrypt.compare(value, hashedvalue)

    return isValid
  }
})

module.exports = factoryEncrypter()
