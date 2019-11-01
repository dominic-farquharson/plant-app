import * as types from '../../constants/actions'

const initialState = {
  errors: null,
  profile: null,
  isUserFetching: false,
  isUserFetchComplete: false,
  users: [],
}

const users = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.FETCH_USER:
      return {
        ...state,
        isUserFetchComplete: false,
        isUserFetching: true,
      }
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        isUserFetchComplete: true,
        errors: null,
        profile: action.payload.profile,
        isUserFetching: false,
        users: action.payload.users,
      }
    case types.FETCH_USER_FAILURE:
      return {
        ...state,
        profile: null,
        errors: action.payload.errors,
        isUserFetchComplete: true,
        isUserFetching: false,
      }
    case types.LOGOUT_USER:
      return {
        ...state,
        ...initialState,
        isUserFetchComplete: true,
      }
    default:
      return state
  }
}

export default users
