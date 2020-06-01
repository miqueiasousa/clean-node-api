const LoadUserByEmailRepository = require('./load-user-by-email-repository')

describe('LoadUserByEmail Repository', () => {
  test('Should return null if no user is found', async () => {
    const sut = LoadUserByEmailRepository()
    const user = await sut.load('invalid@email.com')

    expect(user).toBeNull()
  })
})
