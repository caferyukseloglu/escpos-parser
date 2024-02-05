const express = require('express')
const cors = require('cors')
const parseEscPosFile = require('./esc2html')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/receipt', (req, res) => {
  const filePath = './PRINTERSTRING.bin'
  const result = parseEscPosFile(filePath)

  res.status(200).send(result)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
