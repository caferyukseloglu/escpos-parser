const Command = require('./Command')
const iconv = new (require('iconv').Iconv)('CP437', 'UTF-8')

class TextCmd extends Command {
  constructor() {
    super()
    this.str = ''
    this.control = ['\x00', '\x09', '\x0A', '\x0C', '\x0D', '\x1B', '\x1D', '\x1C', '\x10', '\x18']
  }

  addChar(char, printoutInstance) {
    if (this.control.includes(char)) {
      return false
    }

    this.str += iconv.convert(Buffer.from(char, 'binary')).toString('utf-8')
    return true
  }

  getText() {
    return this.str
  }
}

module.exports = TextCmd
