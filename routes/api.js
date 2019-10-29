const apiRoutes = require('express').Router()

apiRoutes.get('/', (req, res, next) => {
  res.send('API Home')
})

module.exports = apiRoutes
