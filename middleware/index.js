const { isJWTValid } = require('../utils/auth')

const checkForToken = async (req, res, next) => {
  try {
    const authorization = req.get('authorization')
    if (!authorization) throw new Error('token is required')
    const [type, token] = authorization.split(' ')
    if (type !== 'Bearer') throw new Error('invalid token type')
    const data = await isJWTValid(token)
    res.locals.userId = data.id
    next()
  } catch (e) {
    res.status(401)
    next(e)
  }
}

const verifyUserIsLoggedOut = (req, res, next) => {
  const error = 'user is already logged in'
  try {
    const authorization = req.get('authorization')
    if (authorization) throw new Error(error)
    next()
  } catch (e) {
    res.status(400)
    res.locals.error = error
    next(e)
  }
}

module.exports = {
  checkForToken,
  verifyUserIsLoggedOut,
}
