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

  test('Should return undefined if user is no register', async () => {
    const sut = makeSut()
    const accessToken = await sut.auth('any@any.com', 'qwerty')

    expect(accessToken).toBeUndefined()
  })
})
