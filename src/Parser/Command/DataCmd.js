const EscposCommand = require('./EscposCommand')
const UnknownDataSubCmd = require('./UnknownDataSubCmd')

class DataCmd extends EscposCommand {
  constructor() {
    super()
    this.p1 = null
    this.p2 = null
    this.arg1 = null
    this.arg2 = null
    this.data = null
    this.dataSize = null
    this.subCommand = null
  }

  addChar(char) {
    if (this.p1 === null) {
      this.p1 = char.charCodeAt(0)
      return true
    } else if (this.p2 === null) {
      this.p2 = char.charCodeAt(0)
      this.dataSize = this.p1 + this.p2 * 256
      return true
    } else if (this.arg1 === null) {
      this.arg1 = char.charCodeAt(0)
      return true
    } else if (this.arg2 === null) {
      this.arg2 = char.charCodeAt(0)
      this.subCommand = this.getSubCommand(this.arg1, this.arg2, this.dataSize - 2)
      return true
    }
    return this.subCommand.addChar(char)
  }

  getSubCommand(arg1, arg2, len) {
    return new UnknownDataSubCmd(len)
  }

  subCommand() {
    return this.subCommand
  }
}

module.exports = DataCmd
