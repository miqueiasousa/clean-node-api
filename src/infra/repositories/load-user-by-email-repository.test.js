const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let connection
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = LoadUserByEmailRepository(userModel)

  return { sut, userModel }
}

describe('LoadUserByEmail Repository', () => {
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
    const { sut } = makeSut()
    const user = await sut.load('invalid@email.com')

    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const { sut, userModel } = makeSut()
    const {
      ops: [userCreated]
    } = await userModel.insertOne({
      name: 'Fulano',
      email: 'fulano@email.com',
      age: 50,
      state: 'active',
      password: 'qwerty'
    })
    const user = await sut.load(userCreated.email)

    expect(user).toEqual({
      _id: userCreated._id,
      password: userCreated.password
    })
  })
})
