class AuthUseCase {
  constructor (loadUserByEmailRepository, encrypterSpy) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypterSpy = encrypterSpy
  }

  async auth (email, password) {
    if (!email) throw new Error('Email is undefined')
    if (!password) throw new Error('Password is undefined')

    const user = await this.loadUserByEmailRepository.load(email)

    if (!user) return undefined

    const passwordIsValid = await this.encrypterSpy.compare(password, user.password)

    if (!passwordIsValid) return undefined

    return 'token'
  }
}

module.exports = AuthUseCase
