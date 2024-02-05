const EscposCommand = require('./EscposCommand')

class InitializeCmd extends EscposCommand {
  applyToInlineFormatting(formatting) {
    formatting.reset()
  }
}

module.exports = InitializeCmd
