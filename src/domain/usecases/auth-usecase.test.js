const AuthUseCase = require('./auth-usecase')

class LoadUserByEmailRepositorySpy {
  async load (email) {
    return undefined
  }
}

const loadUserByEmailRepositorySpy = () => new LoadUserByEmailRepositorySpy()

const makeSut = () => new AuthUseCase(loadUserByEmailRepositorySpy())

describe('Auth UseCase', () => {
  test('Should throw error if no email provided', async () => {
    const sut = makeSut()

    expect(() => sut.auth()).rejects.toThrowError()
  })

  test('Should throw error if no password provided', async () => {
    const sut = makeSut()

    expect(() => sut.auth()).rejects.toThrowError()
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
