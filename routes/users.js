const users = require('express').Router()
const { User } = require('../db/models')
const { checkForToken } = require('../middleware')
const { updateUserSchema } = require('../utils/schema')

users.use(checkForToken)

users.delete('/', async (req, res, next) => {
  try {
    const { userId } = res.locals
    await User.destroy({
      where: {
        id: userId,
      },
    })
    res.status(204).send()
  } catch (e) {
    next(e)
  }
})

users.get('/profile', async (req, res, next) => {
  try {
    const user = await User.findByPk(res.locals.userId)
    const usersData = await User.findAll({
      attributes: ['firstName', 'id'],
    })
    if (!user) throw new Error('user not found')
    res.status(200).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        favoritePlant: user.favoritePlant,
      },
      users: usersData || [],
      success: true,
    })
  } catch (e) {
    next(e)
  }
})

users.put('/profile', async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body
    const postBody = {
      firstName,
      lastName,
    }

    await updateUserSchema.validate(postBody)

    const [rows, [user]] = await User.update(postBody, {
      where: {
        id: res.locals.userId,
      },
      returning: true,
    })

    if (!user) {
      res.status(404)
      res.locals.error = 'Not found'
      throw new Error('Not found')
    }

    res.status(200).json({
      user: {
        firstName,
        lastName,
      },
      success: true,
    })
  } catch (e) {
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

module.exports = users
