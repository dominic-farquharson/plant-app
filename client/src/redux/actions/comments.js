import * as types from '../../constants/actions'
import { getJWT } from '../../utils'

export const fetchCommentsRequest = () => ({
  type: types.FETCH_COMMENTS,
})

export const fetchCommentsSuccess = comments => ({
  type: types.FETCH_COMMENTS_SUCCESS,
  payload: { comments }
})

export const fetchCommentsFailure = errors => ({
  type: types.FETCH_COMMENTS_FAILURE,
  payload: { errors }
})

export const fetchComments = (postId) => async dispatch => {
  dispatch(fetchCommentsRequest())
  try {
    const req = await fetch(`/api/plants/${postId}/comments`)
    const { comments, errors, success }  = await req.json()
    if (!success) throw new Error(errors)
    dispatch(fetchCommentsSuccess(comments))
  } catch (err) {
    console.error(err)
    dispatch(fetchCommentsFailure('Error fetching comments'))
    throw err
  }
}

export const addComment = (comment) => ({
  type: types.ADD_COMMENT,
  payload: { comment }
})

export const createComment = (body) => async dispatch => {
  try {
    const req = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${getJWT()}`,
      }
    })
    const { comment, success, errors } = await req.json()
    if (!success) throw new Error(errors)
    dispatch(addComment(comment))
  } catch (err) {

    // TODO: eneric error handler that appears at top of page
    console.error(err)
    dispatch(fetchCommentsFailure(' Error adding comment'))
  }
}

export const removeComment = commentId => ({
  type: types.REMOVE_COMMENT,
  payload: { commentId }
})

export const deleteComment = (commentId) => async dispatch => {
  try {
    const req = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${getJWT()}`,
      }
    })
    const {success, errors } = await req.json()
    if (!success) throw new Error(errors)
    dispatch(removeComment(commentId))
  } catch (err) {
    console.error(err)
    // throw err
  }
}

export const updateComment = (comment, commentId) => ({
  type: types.UPDATE_COMMENT,
  payload: {
    comment,
    commentId,
  }
})

export const editComment = (content, commentId) => async dispatch => {
  try {
    const req = await fetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({
        content,
        commentId,
      }),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${getJWT()}`,
      }
    })
    const { comment, success, errors } = await req.json()
    if (!success) throw new Error(errors)
    dispatch(updateComment(comment, commentId))
  } catch (err) {
    console.error(err)
    dispatch(fetchCommentsFailure(' Error updating comment'))
    // throw eerr
  }
}
