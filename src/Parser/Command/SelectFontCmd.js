const CommandOneArg = require('./CommandOneArg')

class SelectFontCmd extends CommandOneArg {
  applyToInlineFormatting(formatting) {
    const arg = this.getArg()
    if (arg === 0 || arg === 48) {
      formatting.setFont(0)
    } else if (arg === 1 || arg === 49) {
      formatting.setFont(1)
    } else if (arg === 2 || arg === 50) {
      formatting.setFont(2)
    }
  }
}

module.exports = SelectFontCmd
