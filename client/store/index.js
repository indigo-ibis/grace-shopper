import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {userReducer} from './user'
import {filterReducer, productReducer} from './filters'
import ordersReducer from './orders'

const reducer = combineReducers({
  user: userReducer,
  selectedProduct: filterReducer,
  products: productReducer,
  orders: ordersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
