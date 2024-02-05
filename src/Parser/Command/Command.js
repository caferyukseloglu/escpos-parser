class Command {
  constructor(context) {
    this.context = context
    this.lineBreak = [
      'FeedAndCutCmd',
      'LineFeedCmd',
      'PrintAndFeedCmd',
      'PrintAndFeedLinesCmd',
      'PrintAndReverseFeedLinesCmd'
    ]
    this.imageContainer = [
      'SelectBitImageModeCmd',
      'StoreRasterFmtDataToPrintBufferGraphicsSubCmd',
      'PrintRasterBitImageCmd'
    ]
    this.inlineFormatting = [
      'SelectFontCmd',
      'EnableUpsideDownPrintModeCmd',
      'WhiteInvertCmd',
      'SelectJustificationCmd',
      'SelectCharacterSizeCmd',
      'SelectPrintModeCmd',
      'EnableUnderlineCmd',
      'EnableEmphasisCmd',
      'InitializeCmd'
    ]
  }

  addChar(char) {
    return false
  }

  isAvailableAs(interfaceName) {
    if (this.constructor.name === interfaceName) {
      return true
    }
    if (interfaceName === 'LineBreak' && this.lineBreak.includes(this.constructor.name)) {
      return true
    }
    if (interfaceName === 'ImageContainer' && this.imageContainer.includes(this.constructor.name)) {
      return true
    }
    if (interfaceName === 'InlineFormattingCmd' && this.inlineFormatting.includes(this.constructor.name)) {
      return true
    }

    const impl = Object.getPrototypeOf(this).constructor

    return interfaceName in impl
  }
}

module.exports = Command
