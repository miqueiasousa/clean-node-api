const req = require('supertest')
const app = require('./app')

app.get('/test')

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    const res = await req(app).get('/test')

    expect(res.header['x-powered-by']).toBeUndefined()
  })

  test('Should enable CORS', async () => {
    const res = await req(app).get('/test')

    expect(res.header['access-control-allow-origin']).toBe('*')
    expect(res.header['access-control-allow-methods']).toBe('*')
    expect(res.header['access-control-allow-headers']).toBe('*')
  })
})
