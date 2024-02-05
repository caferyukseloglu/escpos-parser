const CommandOneArg = require('./CommandOneArg')

class EnableUpsideDownPrintModeCmd extends CommandOneArg {
  applyToInlineFormatting(formatting) {
    const arg = this.getArg()
    if (arg === 0 || arg === 48) {
      formatting.setUpsideDown(false)
    } else if (arg === 1 || arg === 49) {
      formatting.setUpsideDown(true)
    }
  }
}

module.exports = EnableUpsideDownPrintModeCmd
