import Axios from 'axios'

//action creators
const GET_CART = 'GET_CART'
const REMOVE_CARTITEM = 'REMOVE_CARTITEM'
<<<<<<< HEAD
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

//state
=======
const UPDATE_CARTITEM = 'UPDATE_CARTITEM'

>>>>>>> master
const initialState = {
  cartArr: []
}

//functions
export const getCart = payload => ({
  type: GET_CART,
  payload
})

export const deleteCartItem = payload => ({
  type: REMOVE_CARTITEM,
  payload
})

<<<<<<< HEAD
export const updateQuantity = payload => ({
  type: UPDATE_QUANTITY,
  payload
})


//thunks
=======
export const updateCartItem = (quantity, id) => ({
  type: UPDATE_CARTITEM,
  quantity,
  id
})

>>>>>>> master
export const getCartThunk = () => {
  return async dispatch => {
    const {data} = await Axios.get(`/api/users/cart`)
    dispatch(getCart(data))
  }
}

export const deleteCartItemThunk = itemId => {
  return async dispatch => {
    await Axios.delete(`/api/orders/lineItem/${itemId}`)
    dispatch(deleteCartItem(itemId))
  }
}

<<<<<<< HEAD
export const updateQuantityThunk = (itemId, val) => {
  return async dispatch => {
    const {data} = await Axios.put(`/api/users/cart/` + itemId, )
    dispatch(updateQuantity(data))
  }
}

//reducer
=======
export const updateCartItemThunk = (quantity, id) => {
  return async dispatch => {
    await Axios.put(`/api/orders/cart/`, {quantity, id})
    dispatch(updateCartItem(quantity, id))
  }
}

>>>>>>> master
const ordersReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cartArr: action.payload}
    // case CREATE_AIRCRAFT:
    //   return {
    //     ...state,
    //     aircraftArr: [...state.aircraftArr, action.payload]
    //   }
    case REMOVE_CARTITEM:
      let id = +action.payload
      let newCartArr = [...state.cartArr]
      let newCart = {...newCartArr[0]}
      newCart.lineItems = newCart.lineItems.filter(item => item.id !== id)
      console.log(newCart)
      return {
        ...state,
        cartArr: [newCart]
      }
<<<<<<< HEAD

    case UPDATE_QUANTITY:


=======
    case UPDATE_CARTITEM:
      id = +action.id
      let quantity = action.quantity
      newCartArr = [...state.cartArr]
      newCart = {...newCartArr[0]}
      newCart.lineItems.find(item => item.id === id).quantity = quantity
      return {
        ...state,
        cartArr: [newCart]
      }
>>>>>>> master
    default:
      return state
  }
}

export default ordersReducer
