const TextCmd = require('./TextCmd')
const HorizontalTabCmd = require('./HorizontalTabCmd')
const LineFeedCmd = require('./LineFeedCmd')
const FormFeedCmd = require('./FormFeedCmd')
const CarriageReturnCmd = require('./CarriageReturnCmd')
const InitializeCmd = require('./InitializeCmd')
const SelectBitImageModeCmd = require('./SelectBitImageModeCmd')
const SelectPrintModeCmd = require('./SelectPrintModeCmd')
const EnableUpsideDownPrintModeCmd = require('./EnableUpsideDownPrintModeCmd')
const SelectPeripheralDeviceCmd = require('./SelectPeripheralDeviceCmd')
const UnknownCommandOneArg = require('./UnknownCommandOneArg')
const SelectPaperEndSensorsCmd = require('./SelectPaperEndSensorsCmd')
const SelectPrintStopSensorsCmd = require('./SelectPrintStopSensorsCmd')
const EnablePanelButtonsCmd = require('./EnablePanelButtonsCmd')
const SelectDefaultLineSpacingCmd = require('./SelectDefaultLineSpacingCmd')
const SelectLineSpacingCmd = require('./SelectLineSpacingCmd')
const SelectAlternateColorCmd = require('./SelectAlternateColorCmd')
const SelectInternationalCharacterSetCmd = require('./SelectInternationalCharacterSetCmd')
const SelectCodeTableCmd = require('./SelectCodeTableCmd')
const PrintAndFeedCmd = require('./PrintAndFeedCmd')
const EnableUnderlineCmd = require('./EnableUnderlineCmd')
const PrintAndFeedLinesCmd = require('./PrintAndFeedLinesCmd')
const EnableDoubleStrikeCmd = require('./EnableDoubleStrikeCmd')
const SelectFontCmd = require('./SelectFontCmd')
const SelectJustificationCmd = require('./SelectJustificationCmd')
const PrintAndReverseFeedLinesCmd = require('./PrintAndReverseFeedLinesCmd')
const SetAbsolutePrintPosCmd = require('./SetAbsolutePrintPosCmd')
const EnableEmphasisCmd = require('./EnableEmphasisCmd')
const PulseCmd = require('./PulseCmd')
const SetRelativeVerticalPrintPositionCmd = require('./SetRelativeVerticalPrintPositionCmd')
const SelectCharacterSizeCmd = require('./SelectCharacterSizeCmd')
const FeedAndCutCmd = require('./FeedAndCutCmd')
const EnableSmoothingCmd = require('./EnableSmoothingCmd')
const EnableBlackWhiteInvertCmd = require('./EnableBlackWhiteInvertCmd')
const RequestResponseTransmissionCmd = require('./RequestResponseTransmissionCmd')
const GraphicsDataCmd = require('./GraphicsDataCmd')
const Code2DDataCmd = require('./Code2DDataCmd')
const UnknownDataCmd = require('./UnknownDataCmd')

const CancelCmd = require('./CancelCmd')

// Define constants
const NUL = '\x00'
const HT = '\x09'
const LF = '\x0A'
const FF = '\x0C'
const CR = '\x0D'
const ESC = '\x1B'
const GS = '\x1D'
const FS = '\x1C'
const DLE = '\x10'
const CAN = '\x18'

class Printout {
  static tree = {
    [HT]: 'HorizontalTabCmd',
    [LF]: 'LineFeedCmd',
    [FF]: 'FormFeedCmd',
    [CR]: 'CarriageReturnCmd',
    [ESC]: {
      '@': 'InitializeCmd',
      '*': 'SelectBitImageModeCmd',
      '!': 'SelectPrintModeCmd',
      '{': 'EnableUpsideDownPrintModeCmd',
      '=': 'SelectPeripheralDeviceCmd',
      c: {
        0: 'UnknownCommandOneArg',
        1: 'UnknownCommandOneArg',
        3: 'SelectPaperEndSensorsCmd',
        4: 'SelectPrintStopSensorsCmd',
        5: 'EnablePanelButtonsCmd'
      },
      2: 'SelectDefaultLineSpacingCmd',
      3: 'SelectLineSpacingCmd',
      r: 'SelectAlternateColorCmd',
      R: 'SelectInternationalCharacterSetCmd',
      t: 'SelectCodeTableCmd',
      J: 'PrintAndFeedCmd',
      '-': 'EnableUnderlineCmd',
      d: 'PrintAndFeedLinesCmd',
      G: 'EnableDoubleStrikeCmd',
      M: 'SelectFontCmd',
      a: 'SelectJustificationCmd',
      e: 'PrintAndReverseFeedLinesCmd',
      $: 'SetAbsolutePrintPosCmd',
      E: 'EnableEmphasisCmd',
      p: 'PulseCmd'
    },
    [GS]: {
      '\\': 'SetRelativeVerticalPrintPositionCmd',
      '!': 'SelectCharacterSizeCmd',
      V: 'FeedAndCutCmd',
      b: 'EnableSmoothingCmd',
      B: 'EnableBlackWhiteInvertCmd',
      '(': {
        C: {},
        E: {},
        H: 'RequestResponseTransmissionCmd',
        K: {},
        L: 'GraphicsDataCmd',
        k: 'Code2DDataCmd',
        J: 'UnknownDataCmd'
      },
      I: 'TransmitPrinterID',
      h: 'SetBarcodeHeightCmd',
      w: 'SetBarcodeWidthCmd',
      H: 'SelectHriPrintPosCmd',
      k: 'PrintBarcodeCmd',
      v: {
        0: 'PrintRasterBitImageCmd'
      },
      8: {
        L: 'GraphicsLargeDataCmd'
      },
      P: 'CommandTwoArgs'
    },
    [FS]: {
      '.': 'CancelKanjiCharacterMode',
      C: 'SelectKanjiCharacterCode'
    },
    [DLE]: {},
    [CAN]: 'CancelCmd'
  }

  commands = []
  search
  searchStack = []

  constructor(context) {
    this.context = context
    this.commands = []
    this.reset()
  }

  reset() {
    this.search = null
    this.searchStack = []
  }

  addChar(char) {
    if (this.searchStack.length > 0) {
      return this.navigateCommand(char)
    }

    if (this.commands.length !== 0) {
      const top = this.commands[this.commands.length - 1]
      const ret = top.addChar(char)
      if (ret) {
        return true
      }
    }

    if (this.commands.length === 0 || !(this.commands[this.commands.length - 1] instanceof TextCmd)) {
      const top = new TextCmd(this.context, [])
      if (top.addChar(char, Printout.tree)) {
        this.commands.push(top)
        return true
      }
    }

    this.search = Printout.tree
    return this.navigateCommand(char)
  }

  navigateCommand(char) {
    this.searchStack.push(char)

    if (!this.search[char]) {
      this.logUnknownCommand(this.searchStack)
      this.reset()
    } else if (typeof this.search[char] === 'object') {
      this.search = this.search[char]
    } else {
      const className = `${this.search[char]}`
      const CommandClass = eval(className)

      this.commands.push(new CommandClass(this.context, this.searchStack))
      this.reset()
    }
  }

  logUnknownCommand(searchStack) {
    const nonPrintableMap = {
      [NUL]: 'NUL',
      [HT]: 'HT',
      [LF]: 'LF',
      [FF]: 'FF',
      [CR]: 'CR',
      [ESC]: 'ESC',
      [GS]: 'GS',
      [FS]: 'FS',
      [DLE]: 'DLE',
      [CAN]: 'CAN'
    }

    const cmdStack = searchStack.map((s) => nonPrintableMap[s] || s)
    //console.error(`WARNING: Unknown command ${cmdStack.join(' ')}\n`)
  }
}

module.exports = Printout
