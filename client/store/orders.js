import Axios from 'axios'

const GET_CART = 'GET_CART'

const initialState = {
  cartArr: []
}

export const getCart = payload => ({
  type: GET_CART,
  payload
})

export const getCartThunk = () => {
  return async dispatch => {
    const {data} = await Axios.get(`/api/users/cart`)
    dispatch(getCart(data))
  }
}

const ordersReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cartArr: action.payload}
    // case CREATE_AIRCRAFT:
    //   return {
    //     ...state,
    //     aircraftArr: [...state.aircraftArr, action.payload]
    //   }
    // case REMOVE_AIRCRAFT:
    //   let id = Number(action.payload)
    //   return {
    //     ...state,
    //     aircraftArr: state.aircraftArr.filter(elem => elem.id !== id)
    //   }

    default:
      return state
  }
}

export default ordersReducer
