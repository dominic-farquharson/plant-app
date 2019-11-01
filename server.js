require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const logger = require('./utils/logger')
const apiRoutes = require('./routes/api')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.resolve('./client/build')))

app.use('/api', apiRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/build/index.html'))
})

app.use((err, req, res, next) => {
  const code = res.statusCode === 200 ? 500 : res.statusCode
  const error = process.env.NODE_ENV !== 'production'
    ? err.stack
    : (res.locals.error || 'Internal Server Error')
  logger.error(err.stack)
  res.status(code).json({
    error,
    success: false,
  })
})

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`)
})
