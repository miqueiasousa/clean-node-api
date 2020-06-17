const req = require('supertest')
const app = require('../config/app')

app.get('/test')

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    const res = await req(app).get('/test')

    expect(res.header['access-control-allow-origin']).toBe('*')
    expect(res.header['access-control-allow-methods']).toBe('*')
    expect(res.header['access-control-allow-headers']).toBe('*')
  })
})
