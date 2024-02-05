const fs = require('fs')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)
const Printout = require('./Command/Printout')
const ParserContextImpl = require('./Context/ParserContextImpl')

class Parser {
  constructor(profileName = 'default') {
    const context = ParserContextImpl.byProfileName(profileName)
    this.printout = new Printout(context)
  }

  getCommands() {
    return this.printout.commands
  }

  addFile(filePath) {
    let buffer = fs.readFileSync(filePath)

    for (let i = 0; i < buffer.length; i++) {
      this.printout.addChar(String.fromCharCode(buffer[i]))
    }
  }
}
module.exports = Parser
