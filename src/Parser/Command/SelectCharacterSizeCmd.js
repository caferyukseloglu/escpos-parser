const CommandOneArg = require('./CommandOneArg')

class SelectCharacterSizeCmd extends CommandOneArg {
  applyToInlineFormatting(formatting) {
    const arg = this.arg

    formatting.setWidthMultiple(2)

    const width = Math.floor(arg / 16) + 1
    const height = (arg % 16) + 1

    formatting.setWidthMultiple(width)
    formatting.setHeightMultiple(height)
  }
}

module.exports = SelectCharacterSizeCmd
