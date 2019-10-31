const apiRoutes = require('express').Router()
const auth = require('./auth')
const comments = require('./comments')
const plants = require('./plants')
const users = require('./users')

apiRoutes.get('/', (req, res, next) => {
  res.send('API Home')
})
apiRoutes.use('/auth', auth)
apiRoutes.use('/comments', comments)
apiRoutes.use('/plants', plants)
apiRoutes.use('/users', users)

module.exports = apiRoutes
