import Axios from 'axios'

//action creators

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_ALL_USERS = 'GET_ALL_USERS'

const initialState = {
  allOrdersArr: [],
  allUsersArr: []
}

//functions
export const getAllOrders = payload => ({
  type: GET_ALL_ORDERS,
  payload
})

export const getAllUsers = payload => ({type: GET_ALL_USERS, payload})

//admin thunks
export const getAllOrdersThunk = () => {
  return async dispatch => {
    const {data} = await Axios.get(`/api/admin/allOrders`)
    // console.log(data, 'DATA')
    dispatch(getAllOrders(data))
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
    default:
      return state
  }
}

export default adminReducer
