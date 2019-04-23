import Axios from 'axios'

//action creators

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_ALL_USERS = 'GET_ALL_USERS'
const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS'

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
//

const adminReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      console.log('in reducer')
      return {...state, allOrdersArr: action.payload}
    case GET_ALL_USERS:
      return {...state, allUsersArr: action.payload}
    case CHANGE_ORDER_STATUS:
      return {...state}
    default:
      return state
  }
}

export default adminReducer
