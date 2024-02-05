const EscposCommand = require('./EscposCommand')
const sharp = require('sharp')

class SelectBitImageModeCmd extends EscposCommand {
  constructor() {
    super()
    this.m = null
    this.p1 = null
    this.p2 = null
    this.data = ''
    this.dataSize = null
    this.width = null
    this.height = null
  }

  addChar(char) {
    if (this.m === null) {
      this.m = char.charCodeAt(0)
      return true
    } else if (this.p1 === null) {
      this.p1 = char.charCodeAt(0)
      return true
    } else if (this.p2 === null) {
      this.p2 = char.charCodeAt(0)
      this.width = this.p1 + this.p2 * 256
      if (this.m === 32 || this.m === 33) {
        this.dataSize = this.width * 3
        this.height = 24
      } else {
        this.dataSize = this.width
        this.height = 8
      }
      return true
    } else if (this.data.length < this.dataSize) {
      this.data += char
      return true
    }
    return false
  }

  getHeight() {
    return this.height
  }

  getWidth() {
    return this.width
  }

  asReflectedPbm() {
    return `P4\n${this.getHeight()} ${this.getWidth()}\n${this.data}`
  }

  asPbm() {
    const pbmBlob = this.asReflectedPbm()
    const buffer = Buffer.from(pbmBlob, 'binary')
    const sharpImage = sharp(buffer).rotate(-90).flip()
    return sharpImage.toBuffer()
  }

  asPng() {
    const pbmBlob = this.asPbm()
    const buffer = Buffer.from(pbmBlob, 'binary')
    const sharpImage = sharp(buffer).toFormat('png')
    return sharpImage.toBuffer()
  }
}

module.exports = SelectBitImageModeCmd
