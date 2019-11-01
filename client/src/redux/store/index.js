import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development' && process.env.ENABLE_LOGGER) {
  middlewares.push(logger)
}

const makeStore = (initialState = {}) => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
}

export default makeStore
