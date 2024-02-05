const CommandOneArg = require('./CommandOneArg')

class EnableUnderlineCmd extends CommandOneArg {
  applyToInlineFormatting(formatting) {
    const arg = this.getArg()
    if (arg === 0 || arg === 48) {
      formatting.setUnderline(0)
    } else if (arg === 1 || arg === 49) {
      formatting.setUnderline(1)
    } else if (arg === 2 || arg === 50) {
      formatting.setUnderline(2)
    }
  }
}

module.exports = EnableUnderlineCmd
