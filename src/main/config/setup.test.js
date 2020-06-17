const req = require('supertest')
const app = require('./app')

app.get('/test')

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    const res = await req(app).get('/test')

    expect(res.header['x-powered-by']).toBeUndefined()
  })
})
