const jwt = require('jsonwebtoken')

const factoryTokenGenerator = () => ({
  async generate (data) {
    return jwt.sign(data, process.env.KEY || 'secret_password')
  }
})

module.exports = factoryTokenGenerator()
