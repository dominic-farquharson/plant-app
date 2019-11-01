const authRoutes = require('express').Router()
const { userSchema } = require('../utils/schema')
const { verifyUserIsLoggedOut } = require('../middleware')
const { hashPassword, validatePassword, generateTJWT } = require('../utils/auth')
const { User } = require('../db/models')

authRoutes.use(verifyUserIsLoggedOut)

authRoutes.post('/register', async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body

    const postBody = {
      firstName,
      lastName,
      email,
      password,
    }

    await userSchema.validate(postBody)

    const hash = await hashPassword(password)
    postBody.password = hash

    const user = await User.create(postBody)
    const token = generateTJWT({
      id: user.id,
    })
    const usersData = await User.findAll({
      attributes: ['firstName', 'id'],
    })
    res.status(200).json({
      token,
      user: {
        id: user.id,
        firstName,
        lastName,
        email,
      },
      users: usersData || [],
      success: true,
    })
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({
        errors: [{
          type: 'INVALID_EMAIL',
          error: 'Email is already in use',
        }],
        success: false,
      })
    }

    if (e.name === 'ValidationError') {
      res.status(400).json({
        errors: e.errors,
        success: false,
      })
      return
    }

    next(e)
  }
})

authRoutes.post('/login', async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body
    const user = await User.findOne({
      where: {
        email,
      }
    })
    if (!user) throw new Error('invalid email')
    const usersData = await User.findAll({
      attributes: ['firstName', 'id'],
    })

    const isPasswordValid = await validatePassword(password, user.password)
    if (!isPasswordValid) throw new Error('invalid password')

    const {
      firstName,
      lastName,
      favoritePlant,
    } = user
    const token = generateTJWT({
      id: user.id,
    })

    res.status(200).json({
      token,
      user: {
        firstName,
        lastName,
        email,
        favoritePlant,
        id: user.id,
      },
      users: usersData || [],
      success: true,
    })
  } catch (e) {
    if (e.message === 'invalid password' || e.message === 'invalid email') {
      res.status(400)
      res.locals.error = 'Invalid email or password'
    }

    next(e)
  }
})

module.exports = authRoutes
