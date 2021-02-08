import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// Import All Reducer
import authReducer from './auth'
import moviesReducer from './movies'
import showtimesReducer from './showtimes'
import orderReducer from './order'
import userReducer from './user'

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth']
}

const authPersistConfig = {
  key: 'auth',
  storage,
  stateReconciler: hardSet
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  movies: moviesReducer,
  showtimes: showtimesReducer,
  order: orderReducer,
  user: userReducer
})

export default persistReducer(rootPersistConfig, rootReducer)