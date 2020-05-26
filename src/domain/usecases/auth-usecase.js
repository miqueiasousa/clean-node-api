class AuthUseCase {
  constructor (loadUserByEmailRepository, encrypterSpy, tokenGenerate) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypterSpy = encrypterSpy
    this.tokenGenerate = tokenGenerate
  }

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
}

module.exports = AuthUseCase
