const plantsRoutes = require('express').Router()
const { Plant, Comment, User } = require('../db/models/')
const { plantSchema } = require('../utils/schema')
const { checkForToken } = require('../middleware')

plantsRoutes.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll({})
    res.status(200).json({
      plants,
      success: true,
    })
  } catch (e) {
    next(e)
  }
})

plantsRoutes.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: {
        postId: req.params.id,
      },
      include: {
        model: User,
        attributes: ['firstName', 'lastName', 'updatedAt'],
      },
    })
    res.status(200).json({
      comments,
      success: true,
    })
  } catch (e) {
    next(e)
  }
})

plantsRoutes.get('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id)
    if (!plant) {
      res.status(404)
      res.locals.error = 'Not found'
      throw new Error('Not found')
    }
    res.status(200).json({
      plant,
      success: true,
    })
  } catch (e) {
    next(e)
  }
})

plantsRoutes.use(checkForToken)

plantsRoutes.post('/', async (req, res, next) => {
  try {
    const { title, description, imageUrl } = req.body

    const postBody = {
      title,
      description,
      imageUrl,
      creatorId: res.locals.userId,
    }

    await plantSchema.validate(postBody, { abortEarly: false })

    const plant = await Plant.create(postBody)
    res.status(200).json({
      plant,
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

plantsRoutes.put('/favorite', async (req, res, next) => {
  const { plantId } = req.body
  try {
    const plant = await Plant.findByPk(plantId)
    const user = await User.findByPk(res.locals.userId)

    // restricting users to one favorite for now

    if (user.favoritePlant && plantId !== user.favoritePlant) {
      res.status(400)
      res.locals.error = 'user has already favorited a plant'
      throw new Error('user has already favorited a plant')
    }

    if (!user.favoritePlant && plant.favorites) {
      res.status(400)
      res.locals.error = 'another user has already favorited this plant'
      throw new Error('another user has already favorited this plant')
    }

    if (
      user.favoritePlant &&
      plant.favorites &&
      plant.favorites.includes(res.locals.userId)
    ) {
      const updatedPlantObj = await plant.update(
        { favorites: null },
        { returning: true },
      )
      const updatedUserObj = await user.update(
        { favoritePlant: null },
        { returning: true },
      )

      return res.json({
        plant: {
          favorites: updatedPlantObj.favorites,
        },
        user: {
          favoritePlant: updatedUserObj.favoritePlant,
        },
        success: true,
      })
    }

    const updatedPlant = await plant.update(
      { favorites: [res.locals.userId] },
      { returning: true },
    )
    const updatedUser = await user.update(
      { favoritePlant: updatedPlant.id },
      { returning: true },
    )
    return res.json({
      plant: {
        favorites: updatedPlant.favorites,
      },
      user: {
        favoritePlant: updatedUser.favoritePlant,
      },
      success: true,
    })
  } catch (e) {
    next(e)
  }
})

plantsRoutes.put('/:id', async (req, res, next) => {
  try {
    const { title, description, imageUrl } = req.body

    const postBody = {
      title,
      description,
      imageUrl,
    }

    await plantSchema.validate(postBody)

    const [rows, [plant]] = await Plant.update(postBody, {
      where: {
        id: req.params.id,
        creatorId: res.locals.userId,
      },
      returning: true,
    })

    if (!plant) {
      res.status(404)
      res.locals.error = 'Not found'
      throw new Error('Not found')
    }

    res.status(200).json({
      plant,
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

plantsRoutes.delete('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.destroy({
      where: {
        id: req.params.id,
        creatorId: res.locals.userId,
      },
    })

    if (!plant) {
      res.status(404)
      res.locals.error = 'Not found'
      throw new Error('Not found')
    }

    res.status(200).json({
      success: true,
    })
  } catch (e) {
    next(e)
  }
})

module.exports = plantsRoutes
