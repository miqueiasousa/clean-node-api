const req = require('supertest')
const app = require('../config/app')

app.post('/test', (req, res) => res.send(req.body))

describe('JSON Parser Middleware', () => {
  test('Should parse body as JSON', async () => {
    const data = { name: 'Fulano', email: 'fulano@mail.com' }

    const res = await req(app).post('/test').send(data)

    expect(res.body).toEqual(data)
  })
})
