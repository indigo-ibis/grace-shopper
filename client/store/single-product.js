import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT'
const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}
export const loadProduct = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/products/${id}`)
      dispatch(getProduct(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
