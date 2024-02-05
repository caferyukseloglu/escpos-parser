class InlineFormatting {
  static JUSTIFY_LEFT = 0
  static JUSTIFY_CENTER = 1
  static JUSTIFY_RIGHT = 2

  static FONT_A = 0
  static FONT_B = 1
  static FONT_C = 2

  constructor() {
    this.reset()
  }

  setBold(bold) {
    this.bold = bold
  }

  setInvert(invert) {
    this.invert = invert
  }

  setWidthMultiple(width) {
    this.widthMultiple = width
  }

  setHeightMultiple(height) {
    this.heightMultiple = height
  }

  setFont(font) {
    this.font = font
  }

  setJustification(justification) {
    this.justification = justification
  }

  setUnderline(underline) {
    this.underline = underline
  }

  setUpsideDown(upsideDown) {
    this.upsideDown = upsideDown
  }

  static getDefault() {
    return new InlineFormatting()
  }

  reset() {
    this.bold = false
    this.widthMultiple = 1
    this.heightMultiple = 1
    this.justification = InlineFormatting.JUSTIFY_LEFT
    this.underline = 0
    this.invert = false
    this.font = 0
    this.upsideDown = false
  }
}

module.exports = InlineFormatting
