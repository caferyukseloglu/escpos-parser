const DataSubCmd = require('./DataSubCmd')
const { createCanvas } = require('canvas')

class StoreRasterFmtDataToPrintBufferGraphicsSubCmd extends DataSubCmd {
  constructor(dataSize) {
    super()
    this.tone = null
    this.color = null
    this.widthMultiple = null
    this.heightMultiple = null
    this.x1 = null
    this.x2 = null
    this.y1 = null
    this.y2 = null
    this.data = ''
    this.dataSize = dataSize - 8
  }

  addChar(char) {
    if (this.tone === null) {
      this.tone = char.charCodeAt(0)
      return true
    } else if (this.color === null) {
      this.color = char.charCodeAt(0)
      return true
    } else if (this.widthMultiple === null) {
      this.widthMultiple = char.charCodeAt(0)
      return true
    } else if (this.heightMultiple === null) {
      this.heightMultiple = char.charCodeAt(0)
      return true
    } else if (this.x1 === null) {
      this.x1 = char.charCodeAt(0)
      return true
    } else if (this.x2 === null) {
      this.x2 = char.charCodeAt(0)
      return true
    } else if (this.y1 === null) {
      this.y1 = char.charCodeAt(0)
      return true
    } else if (this.y2 === null) {
      this.y2 = char.charCodeAt(0)
      return true
    } else if (this.data.length < this.dataSize) {
      this.data += char
      return true
    }
    return false
  }

  getWidth() {
    return this.x1 + this.x2 * 256
  }

  getHeight() {
    return this.y1 + this.y2 * 256
  }

  asPbm() {
    return `P4\n${this.getWidth()} ${this.getHeight()}\n${this.data}`
  }

  asPng() {
    const pbmBlob = this.asPbm()
    const canvas = createCanvas(this.getWidth(), this.getHeight())
    const ctx = canvas.getContext('2d')

    const imageData = ctx.createImageData(this.getWidth(), this.getHeight())
    for (let i = 0; i < this.data.length; i++) {
      const byte = this.data.charCodeAt(i)
      for (let j = 0; j < 8; j++) {
        const bit = (byte >> (7 - j)) & 1
        const index = i * 8 + j
        const pixelIndex = index * 4
        imageData.data[pixelIndex] = 255 * bit
        imageData.data[pixelIndex + 1] = 255 * bit
        imageData.data[pixelIndex + 2] = 255 * bit
        imageData.data[pixelIndex + 3] = 255
      }
    }

    ctx.putImageData(imageData, 0, 0)
    return canvas.toBuffer('image/png')
  }
}

module.exports = StoreRasterFmtDataToPrintBufferGraphicsSubCmd
