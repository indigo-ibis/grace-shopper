import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import allProductsReducer from './all-products'
import selectedProductReducer from './single-product'

const reducer = combineReducers({
  user: userReducer,
  products: allProductsReducer,
  selectedProduct: selectedProductReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './all-products'
export * from './single-product'
