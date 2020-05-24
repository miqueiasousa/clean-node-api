class AuthUseCase {
  accessToken = 'token'

  async auth(email, password) {
    if (!email || !password) {
      return null
    }

    this.email = email
    this.password = password

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
})
