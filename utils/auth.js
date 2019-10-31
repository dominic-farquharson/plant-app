const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = password => bcrypt.hash(password, 12)
const validatePassword = (password, hash) => bcrypt.compare(password, hash)

const { JWT_SECRET } = process.env
const generateTJWT = payload => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'})
const isJWTValid = token => jwt.verify(token, JWT_SECRET)

module.exports = {
  hashPassword,
  validatePassword,
  generateTJWT,
  isJWTValid,
}
