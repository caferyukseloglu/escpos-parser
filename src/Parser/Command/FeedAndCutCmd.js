const Command = require('./Command')
const LineBreak = require('./LineBreak')

class FeedAndCutCmd extends Command {
  constructor() {
    super()
    this.arg1 = null
    this.arg2 = null
  }

  addChar(char) {
    if (this.arg1 === null) {
      this.arg1 = char.charCodeAt(0)
      return true
    } else if ([0, 48, 1, 49].includes(this.arg1) || this.arg2 !== null) {
      // One arg only, or arg already set
      return false
    } else {
      // Read feed length also
      this.arg2 = char.charCodeAt(0)
      return true
    }
  }
}

module.exports = FeedAndCutCmd
