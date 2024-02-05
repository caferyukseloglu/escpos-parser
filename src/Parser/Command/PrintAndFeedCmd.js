const CommandOneArg = require('./CommandOneArg')
const LineBreak = require('./LineBreak')

class PrintAndFeedCmd extends CommandOneArg {
  addChar(char) {
    return false
  }
}

module.exports = PrintAndFeedCmd
