const plantsRoutes = require('express').Router()
const { Plant } = require('../db/models/')
const { plantSchema } = require('../utils/schema')
const { checkForToken } = require('../middleware')

plantsRoutes.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll()
    res.status(200).json({
      plants,
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
      res.status(404);
      res.locals.error = 'Not found';
      throw new Error('Not found');
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
    const {
      title,
      description,
      imageUrl,
    } = req.body

    const postBody = {
      title,
      description,
      imageUrl,
      creatorId: res.locals.userId,
    }

    await plantSchema.validate(postBody)
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

plantsRoutes.put('/:id', async (req, res, next) => {
  try {
    const {
      title,
      description,
      imageUrl,
    } = req.body

    const postBody = {
      title,
      description,
      imageUrl,
    }

    await plantSchema.validate(postBody)

    const [rows, [plant] ] = await Plant.update(postBody, {
      where: {
        id: req.params.id,
        creatorId: res.locals.userId,
      },
      returning: true,
    })

    if (!plant) {
      res.status(404);
      res.locals.error = 'Not found';
      throw new Error('Not found');
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
      }
    })

    if (!plant) {
      res.status(404);
      res.locals.error = 'Not found';
      throw new Error('Not found');
    }

    res.status(200).json({
      success: true,
    })

  } catch (e) {
    next(e)
  }
})

module.exports = plantsRoutes
