import { combineReducers } from 'redux'
import user from './user'
import plants from './plants'
import comments from './comments'

const rootReducer = combineReducers({
  user,
  plants,
  comments,
})

export default rootReducer
