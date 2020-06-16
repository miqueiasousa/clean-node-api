module.exports = (app) => {
  app.disable('x-powered-by')
  app.use((req, res, next) => {
    res.header('access-control-allow-origin', '*')
    res.header('access-control-allow-methods', '*')
    res.header('access-control-allow-headers', '*')
    next()
  })
}
