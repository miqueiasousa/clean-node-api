const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

describe('LoadUserByEmail Repository', () => {
  let connection
  let db

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    db = connection.db()
  })

  beforeEach(async () => await db.collection('users').deleteMany())

  afterAll(async () => await connection.close())

  test('Should return null if no user is found', async () => {
    const userModel = db.collection('users')
    const sut = LoadUserByEmailRepository(userModel)
    const user = await sut.load('invalid@email.com')

    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const userModel = db.collection('users')
    const email = 'any@email.com'

    await userModel.insertOne({ email })

    const sut = LoadUserByEmailRepository(userModel)
    const user = await sut.load(email)

    expect(user.email).toBe(email)
  })
})
