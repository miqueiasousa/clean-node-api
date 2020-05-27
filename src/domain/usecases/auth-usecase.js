const factoryAuthUseCase = (loadUserByEmailRepository, encrypterSpy, tokenGenerate) => ({
  loadUserByEmailRepository,
  encrypterSpy,
  tokenGenerate,
  async auth (email, password) {
    try {
      const [user] = await this.loadUserByEmailRepository.load(email)
      const isValid = user && (await this.encrypterSpy.compare(password, user.password))

      if (!isValid) return undefined

      const accessToken = await this.tokenGenerate.generate(user)

      return accessToken
    } catch (error) {
      throw new Error(error.message)
    }
  }
})

module.exports = factoryAuthUseCase
