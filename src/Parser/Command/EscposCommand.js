const Command = require('./Command')

class EscposCommand extends Command {
  constructor(context, stack) {
    super(context)
    this.stack = stack
  }
}

module.exports = EscposCommand
