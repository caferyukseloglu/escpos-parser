const EscposCommand = require('./EscposCommand')

class CommandOneArg extends EscposCommand {
  constructor() {
    super()
    this.arg = null
  }

  addChar(char) {
    if (this.arg === null) {
      // Assuming char is a string, getting its ASCII value
      this.arg = char.charCodeAt(0)
      return true
    } else {
      return false
    }
  }

  getArg() {
    return this.arg
  }
}

module.exports = CommandOneArg
