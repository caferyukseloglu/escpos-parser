const CommandOneArg = require('./CommandOneArg')

class EnableEmphasisCmd extends CommandOneArg {
  applyToInlineFormatting(formatting) {
    formatting.setBold(this.getArg() === 1)
  }
}

module.exports = EnableEmphasisCmd
