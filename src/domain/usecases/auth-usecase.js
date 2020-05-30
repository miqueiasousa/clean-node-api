const factoryAuthUseCase = ({ loadUserByEmailRepository, encrypter, tokenGenerator } = {}) => ({
  loadUserByEmailRepository,
  encrypter,
  tokenGenerator,
  async auth (email, password) {
    try {
      const [user] = await this.loadUserByEmailRepository.load(email)
      const isValid = user && (await this.encrypter.compare(password, user.password))

      if (!isValid) return undefined

      const accessToken = await this.tokenGenerator.generate(user)

      return accessToken
    } catch (error) {
      throw new Error(error.message)
    }
  }
})

module.exports = factoryAuthUseCase
