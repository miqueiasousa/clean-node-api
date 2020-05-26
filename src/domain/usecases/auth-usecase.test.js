const AuthUseCase = require('./auth-usecase')

class LoadUserByEmailRepositorySpy {
  constructor () {
    this.user = {}
  }

  async load (email) {
    const users = [{ email: 'any@any.com', passwor: 'querty' }]
    const user = users.filter(e => email === e.email)

    if (!user) return undefined

    this.user = user

    return this.user
  }
}

class EncrypterSpy {
  async compare (password, hashedPassword) {
    if (password !== hashedPassword) return false

    return true
  }
}

const loadUserByEmailRepositorySpy = () => new LoadUserByEmailRepositorySpy()

const encrypterSpy = () => new EncrypterSpy()

const makeSut = () => new AuthUseCase(loadUserByEmailRepositorySpy(), encrypterSpy())

describe('Auth UseCase', () => {
  test('Should throw error if no email provided', async () => {
    const sut = makeSut()

    expect(() => sut.auth()).rejects.toThrowError()
  })

  test('Should throw error if no password provided', async () => {
    const sut = makeSut()

    expect(() => sut.auth('any@any.com')).rejects.toThrowError()
  })

  test('Should return undefined if an invalid email is provided', async () => {
    const sut = makeSut()
    const accessToken = await sut.auth('invalid_email@any.com', 'qwerty')

    expect(accessToken).toBeUndefined()
  })

  test('Should return undefined if an invalid password is provided', async () => {
    const sut = makeSut()
    const accessToken = await sut.auth('any@any.com', 'invalid_password')

    expect(accessToken).toBeUndefined()
  })
})
