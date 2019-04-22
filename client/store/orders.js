import Axios from 'axios'

//action creators
const GET_CART = 'GET_CART'
const REMOVE_CARTITEM = 'REMOVE_CARTITEM'
const ADD_ITEM = 'ADD_ITEM'
const UPDATE_CARTITEM = 'UPDATE_CARTITEM'

const initialState = {
  cartArr: {}
}
//functions
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

export const updateCartItem = (quantity, id) => ({
  type: UPDATE_CARTITEM,
  quantity,
  id
})

export const getCartThunk = () => {
  return async dispatch => {
    const {data} = await Axios.get(`/api/orders/mycart`)
    dispatch(getCart(data))
  }
}

export const addItemThunk = (productId, quantity = 1) => {
  return async dispatch => {
    /* if (!orderId) {
       orderId = (await Axios.post(`/api/orders/`)).data
       console.log(orderId)
    } */
    const {data} = await Axios.get('/api/orders/mycart')
    const data2 = await Axios.post(`/api/orders/${data.id}`, {
      productId,
      quantity
    })
    dispatch(addItem(data2.data))
  }
}

export const deleteCartItemThunk = itemId => {
  return async dispatch => {
    await Axios.delete(`/api/orders/lineItem/${itemId}`)
    dispatch(deleteCartItem(itemId))
  }
}

export const updateCartItemThunk = (quantity, id) => {
  return async dispatch => {
    await Axios.put(`/api/orders/mycart/`, {quantity, id})
    dispatch(updateCartItem(quantity, id))
  }
}

const ordersReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cartArr: action.payload}
    case ADD_ITEM:
      return {
        ...state,
        cartArr: {
          ...state.cartArr,
          lineItems: [...state.cartArr.lineItems, action.payload]
        } //, action.payload}
      }
    case REMOVE_CARTITEM:
      let id = +action.payload
      let newCart = {...state.cartArr}
      newCart.lineItems = newCart.lineItems.filter(item => item.id !== id)
      return {
        ...state,
        cartArr: newCart
      }
    case UPDATE_CARTITEM:
      id = +action.id
      let quantity = action.quantity
      newCart = {...state.cartArr}
      let newLineItems = [...newCart.lineItems]
      newLineItems.find(item => item.id === id).quantity = quantity
      return {
        ...state,
        cartArr: {...newCart, lineItems: newLineItems}
      }
    default:
      return state
  }
}

export default ordersReducer
