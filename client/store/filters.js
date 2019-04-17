import axios from 'axios'
import history from '../history'
/**
 * ACTION TYPES
 */
const SET_FILTER = 'GET_FILTER'
const GET_PRODUCT = 'GET_PRODUCT'

/**
 * INITIAL STATE
 */
const products = []

const selectedProduct = {
  house : null,
  category : 'all'
}

/**
 * ACTION CREATORS
 */
const setFilter = (house, category) => {
  return {
    type: SET_FILTER,
    house,
    category
  }
}

const getProduct = (products) => {
  return {
    type: GET_PRODUCT,
    products
  }
}

/**
 * THUNK CREATORS
 */

export const loadSelectedProducts = function(house, cate){
  return async (dispatch) => {
    try {
      let res = await axios.get(`/api/products?house=${house}&productCategory=${cate}`)
      dispatch(getProduct(res.data))
    } catch (error){
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */

export function filterReducer(state = selectedProduct, action) {
  switch (action.type) {
    case SET_FILTER:
      return {...state, house: action.house || null, productCategory : action.category || "all"}
    default:
      return state
  }
}

export function productReducer(state = products, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.products
    default:
      return state
  }
}
