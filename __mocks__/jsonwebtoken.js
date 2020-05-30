module.exports = {
  token: 'any_token',
  async sign (data, secret) {
    return this.token
  }
}
