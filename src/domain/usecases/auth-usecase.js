class AuthUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) throw new Error('Email is undefined')
    if (!password) throw new Error('Password is undefined')

    const user = await this.loadUserByEmailRepository.load(email)

    if (!user) return undefined

    return 'token'
  }
}

module.exports = AuthUseCase
