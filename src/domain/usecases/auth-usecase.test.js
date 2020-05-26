const AuthUseCase = require('./auth-usecase')

const loadUserByEmailRepositorySpy = () => ({
  user: {},
  load (email) {
    const users = [{ email: 'any@any.com', password: 'qwerty' }]
    const user = users.filter(e => email === e.email)

    if (!user) return undefined

    this.user = user

    return this.user
  }
})

const encrypterSpy = () => ({
  compare (password, hashedPassword) {
    if (password !== hashedPassword) return false

    return true
  }
})

const tokenGenerateSpy = () => ({
  generate (user) {
    return 'token'
  }
})

const makeSut = () =>
  new AuthUseCase(loadUserByEmailRepositorySpy(), encrypterSpy(), tokenGenerateSpy())

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

  test('Should return an token if correct credentials are provided', async () => {
    const sut = makeSut()
    const accessToken = await sut.auth('any@any.com', 'qwerty')

    expect(accessToken).toBeTruthy()
  })
})
