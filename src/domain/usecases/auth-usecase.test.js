class AuthUseCase {
  constructor(loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  accessToken = 'token'

  async auth(email, password) {
    if (!email || !password) {
      return null
    }

    await this.loadUserByEmailRepository.load(email)

    return this.accessToken
  }
}

describe('Auth UseCase', () => {
  test('Should return null if no email provided', async () => {
    const sut = new AuthUseCase()
    const accessToken = await sut.auth()

    expect(accessToken).toBeNull()
  })

  test('Should return null if no password provided', async () => {
    const sut = new AuthUseCase()
    const accessToken = await sut.auth('any@any.com')

    expect(accessToken).toBeNull()
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    class LoadUserByEmailRepositorySpy {
      async load(email) {
        this.email = email
      }
    }
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy)

    await sut.auth('any@any.com', 'qwerty')

    expect(loadUserByEmailRepositorySpy.email).toBe('any@any.com')
  })
})
