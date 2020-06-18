const req = require('supertest')
const app = require('../config/app')

describe('CORS Middleware', () => {
  test('Should enable CORS', () => {
    req(app)
      .get('/test')
      .expect('access-control-allow-origin', /\*/)
      .expect('access-control-allow-methods', /\*/)
      .expect('access-control-allow-headers', /\*/)
  })
})
