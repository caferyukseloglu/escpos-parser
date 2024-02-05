const EscposCommand = require('./EscposCommand')

class CommandThreeArgs extends EscposCommand {
  constructor() {
    super()
    this.arg1 = null
    this.arg2 = null
    this.arg3 = null
  }

  addChar(char) {
    if (this.arg1 === null) {
      this.arg1 = char.charCodeAt(0)
      return true
    } else if (this.arg2 === null) {
      this.arg2 = char.charCodeAt(0)
      return true
    } else if (this.arg3 === null) {
      this.arg3 = char.charCodeAt(0)
      return true
    }
    return false
  }
}

module.exports = CommandThreeArgs
