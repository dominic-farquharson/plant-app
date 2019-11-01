import * as types from '../../constants/actions'

const initialState = {
  errors: null,
  comments: [],
  isFetching: false,
  isFetchComplete: false,
}

const comments = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.FETCH_COMMENTS:
      return {
        ...state,
        isFetchComplete: false,
        isFetching: true,
        comments: [],
      }
    case types.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetchComplete: true,
        errors: null,
        comments: action.payload.comments,
      }
    case types.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        errors: action.payload.errors,
        isFetchComplete: true,
        isFetching: false,
      }
    case types.ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.payload.comment),
      }
    case types.REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload.commentId)
      }
    case types.UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === action.payload.commentId) return {
            ...comment,
            ...action.payload.comment
          }
          return comment
        }),
      }
    default:
      return state
  }
}

export default comments
