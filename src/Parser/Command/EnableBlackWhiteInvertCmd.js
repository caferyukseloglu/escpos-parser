const CommandOneArg = require('./CommandOneArg')

class EnableBlackWhiteInvertCmd extends CommandOneArg {
  applyToInlineFormatting(formatting) {
    const arg = this.getArg()
    if (arg === 0 || arg === 48) {
      formatting.setInvert(false)
    } else if (arg === 1 || arg === 49) {
      formatting.setInvert(true)
    }
  }
}

module.exports = EnableBlackWhiteInvertCmd
