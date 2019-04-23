import Axios from 'axios'

//action creators

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_ALL_USERS = 'GET_ALL_USERS'
const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS'
const DELETE_ORDER = 'DELETE_ORDER'
const DELETE_USER = 'DELETE_USER'

const initialState = {
  allOrdersArr: [],
  allUsersArr: []
}

//functions
// export const getAllOrders = payload => ({
//   type: GET_ALL_ORDERS,
//   payload
// })

export const getAllOrders = payload => ({type: GET_ALL_ORDERS, payload})
export const getAllUsers = payload => ({type: GET_ALL_USERS, payload})
export const changeOrderStatus = payload => ({
  type: CHANGE_ORDER_STATUS,
  payload
})
export const deleteOrder = payload => ({
  type: DELETE_ORDER,
  payload
})

export const deleteUser = payload => ({
  type: DELETE_USER,
  payload
})

//admin thunks
export const getAllOrdersThunk = () => {
  return async dispatch => {
    const {data} = await Axios.get(`/api/admin/allOrders`)
    // console.log(data, 'DATA')
    dispatch(getAllOrders(data))
  }
}

export const changeOrderStatusThunk = (orderId, newStatus) => {
  return async dispatch => {
    const {data} = await Axios.put(
      `/api/admin/changeorderstatus/${orderId}/${newStatus}`
    )
    // console.log(data, 'DATA')
    dispatch(changeOrderStatus(data))
  }
}

export const getAllUsersThunk = () => async dispatch => {
  try {
    const {data} = await Axios.get('api/admin/allUsers')
    console.log(data, 'RESDOTDATA')
    dispatch(getAllUsers(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUserThunk = userId => async dispatch => {
  try {
    console.log('in the Thunk')
    await Axios.delete(`api/admin/delete/${userId}`)
    dispatch(deleteUser(userId))
  } catch (err) {
    console.error(err)
  }
}

export const deleteOrderThunk = orderId => async dispatch => {
  try {
    await Axios.delete(`api/admin/${orderId}/clear`)
    dispatch(deleteOrder(orderId))
  } catch (err) {
    console.error(err)
  }
}

const adminReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {...state, allOrdersArr: action.payload}
    case GET_ALL_USERS:
      return {...state, allUsersArr: action.payload}
    case CHANGE_ORDER_STATUS:
      return {...state}
    case DELETE_ORDER:
      return {
        ...state,
        allOrdersArr: state.allOrdersArr.filter(
          order => order.id !== action.payload
        )
      }
    case DELETE_USER:
      return {
        ...state,
        allUsersArr: state.allOrdersArr.filter(
          user => user.id !== action.payload
        )
      }
    default:
      return state
  }
}

export default adminReducer
