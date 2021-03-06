import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import allProductsReducer from './all-products'
import selectedProductReducer from './single-product'
import ordersReducer from './orders'
import adminReducer from './admin'

const reducer = combineReducers({
  user: userReducer,
  products: allProductsReducer,
  selectedProduct: selectedProductReducer,
  orders: ordersReducer,
  admin: adminReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './all-products'
export * from './single-product'
