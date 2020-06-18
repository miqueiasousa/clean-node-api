const req = require('supertest')
const app = require('../config/app')

app.post('/test', (req, res) => res.send(req.body))

describe('JSON Parser Middleware', () => {
  test('Should parse body as JSON', async () => {
    req(app)
      .post('/test')
      .send({ name: 'Fulano', email: 'fulano@mail.com' })
      .expect(200)
  })
})
