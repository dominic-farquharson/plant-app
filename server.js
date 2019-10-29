const express = require('express')
const logger = require('./utils/logger')
const apiRoutes = require('./routes/api')

const app = express()

app.use('/api', apiRoutes)

app.use((err, req, res, next) => {
  const code = res.statusCode === 200 ? 500 : res.statusCode
  logger.error(err)
  res.status(code).json({
    error: err,
  })
})

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`)
})
