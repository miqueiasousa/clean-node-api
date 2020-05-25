class AuthUseCase {
  constructor(loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  accessToken = 'token'

  async auth(email, password) {
    try {
      if (!email || !password || !this.loadUserByEmailRepository) return null

      const user = await this.loadUserByEmailRepository.load(email)

      if (!user) return null

      return this.accessToken
    } catch (error) {
      return null
    }
  }
}

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      this.email = email
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy)

  return { sut, loadUserByEmailRepositorySpy }
}

describe('Auth UseCase', () => {
  test('Should return null if no email provided', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth()

    expect(accessToken).toBeNull()
  })

  test('Should return null if no password provided', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('any@any.com')

    expect(accessToken).toBeNull()
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()

    await sut.auth('any@any.com', 'qwerty')

    expect(loadUserByEmailRepositorySpy.email).toBe('any@any.com')
  })

  test('Should return null if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase()
    const accessToken = await sut.auth('any@any.com', 'qwerty')

    expect(accessToken).toBeNull()
  })

  test('Should return null if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const accessToken = await sut.auth('any@any.com', 'qwerty')

    expect(accessToken).toBeNull()
  })

  test('Should return null if LoadUserByEmailRepository return null', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('any@any.com', 'qwerty')

    expect(accessToken).toBeNull()
  })
})
