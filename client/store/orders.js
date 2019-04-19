import Axios from 'axios'

const GET_CART = 'GET_CART'
const REMOVE_CARTITEM = 'REMOVE_CARTITEM'
const ADD_ITEM = 'ADD_ITEM'

const initialState = {
  cartArr: []
}

export const getCart = payload => ({
  type: GET_CART,
  payload
})

export const addItem = payload => ({
  type: ADD_ITEM,
  payload
})

export const deleteCartItem = payload => ({
  type: REMOVE_CARTITEM,
  payload
})

export const getCartThunk = () => {
  return async dispatch => {
    const {data} = await Axios.get(`/api/users/cart`)
    dispatch(getCart(data))
  }
}

export const addItemThunk = (orderId, productId, quantity = 1) => {
  console.log(orderId, 'ORDER ID')
  return async dispatch => {
    // if (!orderId) {
    //   orderId = (await Axios.post(`/api/orders/`)).data
    //   console.log(orderId)
    // }
    const {data} = await Axios.post(`/api/orders/${orderId}`, {
      productId,
      quantity
    })

    dispatch(addItem(data))
  }
}

export const deleteCartItemThunk = itemId => {
  return async dispatch => {
    await Axios.delete(`/api/orders/lineItem/${itemId}`)
    dispatch(deleteCartItem(itemId))
  }
}

const ordersReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cartArr: action.payload}
    case ADD_ITEM:
      return {
        ...state,
        cartArr: [...state.cartArr, action.payload]
      }
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
    default:
      return state
  }
}

export default ordersReducer
