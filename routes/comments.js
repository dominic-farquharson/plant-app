const commentsRoutes = require('express').Router()
const { Comment } = require('../db/models/')
const { checkForToken } = require('../middleware')
const { createCommentSchema, updateCommentSchema } = require('../utils/schema')

commentsRoutes.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.findAll()
    res.status(200).json({
      comments,
      success: true,
    })
  } catch (e) {
    next(e)
  }
})

commentsRoutes.get('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id)
    if (!comment) {
      res.status(404);
      res.locals.error = 'Not found';
      throw new Error('Not found');
    }
    res.status(200).json({
      comment,
      success: true,
    })
  } catch (e) {
    next(e)
  }
})

commentsRoutes.use(checkForToken)

commentsRoutes.post('/', async (req, res, next) => {
  try {
    const {
      content,
      postId,
    } = req.body
    const postBody = {
      content,
      postId,
      creatorId: res.locals.userId,
    }

    await createCommentSchema.validate(postBody)

    const newComment = await Comment.create(postBody)
    res.status(201).json({
      comment: newComment,
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

commentsRoutes.delete('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
        creatorId: res.locals.userId,
      }
    })

    if (!comment) {
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

commentsRoutes.put('/:id', async (req, res, next) => {
  try {
    const {
      content,
    } = req.body

    const postBody = {
      content,
    }

    await updateCommentSchema.validate(postBody)

    const [rows, [comment] ] = await Comment.update(postBody, {
      where: {
        id: req.params.id,
        creatorId: res.locals.userId,
      },
      returning: true,
    })

    if (!comment) {
      res.status(404);
      res.locals.error = 'Not found';
      throw new Error('Not found');
    }

    res.status(200).json({
      comment,
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

module.exports = commentsRoutes
