class ParserContextImpl {
  constructor(profileName) {
    this.profile = this.loadProfile(profileName)
  }

  getProfile() {
    return this.profile
  }

  loadProfile(profileName) {
    const profiles = {
      default: {
        codePage: 'CP437',
        width: 48
      }
    }

    return profiles[profileName] || profiles.default
  }

  static byProfileName(profileName) {
    return new ParserContextImpl(profileName)
  }
}

module.exports = ParserContextImpl
