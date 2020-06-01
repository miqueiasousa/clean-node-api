const loadUserByEmailRepository = userModel => ({
  userModel,
  async load (email) {
    const user = await this.userModel.findOne({ email })

    return user
  }
})

module.exports = loadUserByEmailRepository
