const req = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    app.get('/test')

    const res = await req(app).get('/test')

    expect(res.header['x-powered-by']).toBeUndefined()
  })
})
