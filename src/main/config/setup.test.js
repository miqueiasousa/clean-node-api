const req = require('supertest')
const app = require('./app')

app.get('/test')

describe('App Setup', () => {
  test('Should disable x-powered-by header', () => {
    req(app)
      .get('/')
      .expect('x-powered-by', /undefined/)
  })
})
