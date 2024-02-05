const fs = require('fs')
const InlineFormatting = require('./src/Parser/Context/InlineFormatting')
const Parser = require('./src/Parser/Parser')

function parseEscPosFile(filePath) {
  try {
    const parser = new Parser()
    parser.addFile(filePath)

    const commands = parser.getCommands()
    let formatting = InlineFormatting.getDefault()
    const output = []
    let lineHtml = ''
    let bufferedImg = null
    let skipLineBreak = false

    commands.forEach((cmd) => {
      if (cmd.isAvailableAs('InitializeCmd')) {
        formatting = InlineFormatting.getDefault()
      }

      if (cmd.isAvailableAs('InlineFormattingCmd')) {
        cmd.applyToInlineFormatting(formatting)
      }

      if (cmd.isAvailableAs('TextCmd')) {
        const spanContentText = cmd.getText()
        lineHtml += span(formatting, spanContentText)
      }

      if (cmd.isAvailableAs('LineBreak') && skipLineBreak) {
        skipLineBreak = false
      } else if (cmd.isAvailableAs('LineBreak')) {
        if (lineHtml === '') {
          lineHtml = span(formatting)
        }
        const classes = getBlockClasses(formatting)
        const classesStr = classes.join(' ')
        output.push(wrapInline(`<div class="${classesStr}">`, '</div>', lineHtml))
        lineHtml = ''
      }

      if (cmd.isAvailableAs('GraphicsDataCmd') || cmd.isAvailableAs('GraphicsLargeDataCmd')) {
        const sub = cmd.subCommand
        if (sub.isAvailableAs('StoreRasterFmtDataToPrintBufferGraphicsSubCmd')) {
          bufferedImg = sub
        } else if (sub.isAvailableAs('PrintBufferredDataGraphicsSubCmd') && bufferedImg !== null) {
          const classes = getBlockClasses(formatting)
          const classesStr = classes.join(' ')
          output.push(wrapInline(`<div class="${classesStr}">`, '</div>', imgAsDataUrl(bufferedImg)))
          lineHtml = ''
        }
      } else if (cmd.isAvailableAs('ImageContainer')) {
        const classes = getBlockClasses(formatting)
        const classesStr = classes.join(' ')
        output.push(wrapInline(`<div class="${classesStr}">`, '</div>', imgAsDataUrl(cmd)))
        lineHtml = ''
        skipLineBreak = true
      }
    })

    const cssContent = fs.readFileSync('./src/resources/esc2html.css', 'utf8')

    const metaInfo = ['<meta charset="UTF-8">', '<style>', cssContent, '</style>']

    const receipt = wrapBlock('<div class="esc-receipt">', '</div>', output)
    const head = wrapBlock('<head>', '</head>', metaInfo)
    const body = wrapBlock('<body>', '</body>', receipt)
    const html = wrapBlock('<html>', '</html>', [...head, ...body], false)

    return `<!DOCTYPE html>\n${html.join('\n')}`
  } catch (error) {
    console.error('Error reading or processing file:', error)
    return null
  }
}

function imgAsDataUrl(bufferedImg) {
  const imgAlt = `Image ${bufferedImg.getWidth()}x${bufferedImg.getHeight()}`
  const imgSrc = `data:image/png;base64,${bufferedImg.asPng().toString('base64')}`
  const imgWidth = bufferedImg.getWidth() / 2

  return `<img class="esc-bitimage" src="${imgSrc}" alt="${imgAlt}" width="${imgWidth}px" />`
}

function wrapInline(tag, closeTag, content) {
  return `${tag}${content}${closeTag}`
}

function wrapBlock(tag, closeTag, content, indent = true) {
  const ret = [tag]
  content.forEach((line) => {
    ret.push(`${indent ? '  ' : ''}${line}`)
  })
  ret.push(closeTag)
  return ret
}

function span(formatting, spanContentText = false) {
  if (formatting.widthMultiple > 8) {
    formatting.widthMultiple = 8
  }

  if (formatting.heightMultiple > 8) {
    formatting.heightMultiple = 8
  }

  const classes = []

  if (formatting.bold) {
    classes.push('esc-emphasis')
  }

  if (formatting.underline > 0) {
    classes.push(formatting.underline > 1 ? 'esc-underline-double' : 'esc-underline')
  }

  if (formatting.invert) {
    classes.push('esc-invert')
  }

  if (formatting.upsideDown) {
    classes.push('esc-upside-down')
  }

  if (formatting.font === 1) {
    classes.push('esc-font-b')
  }

  if (formatting.widthMultiple > 1 || formatting.heightMultiple > 1) {
    classes.push('esc-text-scaled')
    classes.push(`esc-width-${formatting.widthMultiple}`)
    classes.push(`esc-height-${formatting.heightMultiple}`)
  }

  const spanContentHtml = spanContentText === false ? '&nbsp;' : spanContentText

  return `<span class="${classes.join(' ')}">${spanContentHtml}</span>`
}

function getBlockClasses(formatting) {
  const classes = ['esc-line']
  if (formatting.justification === InlineFormatting.JUSTIFY_CENTER) {
    classes.push('esc-justify-center')
  } else if (formatting.justification === InlineFormatting.JUSTIFY_RIGHT) {
    classes.push('esc-justify-right')
  }
  return classes
}

module.exports = parseEscPosFile
