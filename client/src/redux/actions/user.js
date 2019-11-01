import * as types from '../../constants/actions'
import { getJWT } from '../../utils'

export const fetchUserRequest = () => ({
  type: types.FETCH_USER,
})

export const fetchUserSuccess = (profile, users) => ({
  type: types.FETCH_USER_SUCCESS,
  payload: { profile, users }
})

export const fetchUserFailure = errors => ({
  type: types.FETCH_PLANTS_FAILURE,
  payload: { errors }
})

export const fetchUser = () => async dispatch => {
  dispatch(fetchUserRequest())
  try {
    const req = await fetch('/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${getJWT()}`,
      }
    })
    const res = await req.json()
    dispatch(fetchUserSuccess(res.user, res.users))
  } catch (err) {
    console.error(err)
    dispatch(fetchUserFailure('Error fetching user profile'))
  }
}

export const login = ({
  email,
  password,
}) => async dispatch => {
  dispatch(fetchUserRequest())
  try {
    const req = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    const { token, user, users, success, error } = await req.json()
    if (!success) throw new Error(error)
    localStorage.setItem('token', token)
    dispatch(fetchUserSuccess(user, users))
  } catch (e) {
    dispatch(fetchUserFailure(e))
    throw e
  }
}

export const register = ({
  email,
  password,
  firstName,
  lastName,
}) => async dispatch => {
  dispatch(fetchUserRequest())
  try {
    const req = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      })
    })
    const { token, user, success, users, errors } = await req.json()
    if (!success) throw errors
    localStorage.setItem('token', token)
    dispatch(fetchUserSuccess(user, users))
  } catch (e) {
    dispatch(fetchUserFailure(e))
    throw e
  }
}

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
})

export const logout = () => async dispatch => {
  localStorage.removeItem('token')
  dispatch(logoutUser())
}
