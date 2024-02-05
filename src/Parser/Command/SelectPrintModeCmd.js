const CommandOneArg = require('./CommandOneArg')

class SelectPrintModeCmd extends CommandOneArg {
  applyToInlineFormatting(formatting) {
    const arg = this.arg
    formatting.setFont(arg & 1)
    formatting.setBold(arg & 8)
    formatting.setHeightMultiple(arg & 16 ? 2 : 1)
    formatting.setWidthMultiple(arg & 32 ? 2 : 1)
    formatting.setUnderline(arg & 128)
  }
}

module.exports = SelectPrintModeCmd
