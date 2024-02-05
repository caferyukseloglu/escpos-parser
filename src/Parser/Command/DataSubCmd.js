const Command = require('./Command')

class DataSubCmd extends Command {
  constructor(dataSize) {
    super()
    this.data = ''
    this.dataSize = dataSize
  }

  addChar(char) {
    if (this.data.length < this.dataSize) {
      this.data += char
      return true
    }
    return false
  }
}

module.exports = DataSubCmd
