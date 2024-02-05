const CommandOneArg = require('./CommandOneArg')
const InlineFormatting = require('../Context/InlineFormatting')

class SelectJustificationCmd extends CommandOneArg {
  applyToInlineFormatting(formatting) {
    const arg = this.getArg()
    if (arg === 0 || arg === 48) {
      formatting.setJustification(InlineFormatting.JUSTIFY_LEFT)
    } else if (arg === 1 || arg === 49) {
      formatting.setJustification(InlineFormatting.JUSTIFY_CENTER)
    } else if (arg === 2 || arg === 50) {
      formatting.setJustification(InlineFormatting.JUSTIFY_RIGHT)
    }
  }
}

module.exports = SelectJustificationCmd
