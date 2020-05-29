const factoryEncrypter = () => ({
  async compare (password, hashedPassword) {
    return true
  }
})

module.exports = factoryEncrypter()
