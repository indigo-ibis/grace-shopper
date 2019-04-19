import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
}
export const loadSelectedProducts = function(house=null, cate=null){
  return async (dispatch) => {
    try {
      let queries = '?';
      if (house) { queries += `house=${house}` }
      if (cate) { queries += (house ? '&' : '') + `productCategory=${cate}` }
      const res = await axios.get(`/api/products${queries}`)
      dispatch(getProducts(res.data))
    } catch (error){
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */

export default (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
