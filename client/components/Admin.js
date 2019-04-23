import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrdersThunk} from '../store/admin'
import {getAllUsersThunk} from '../store/admin'
import {changeOrderStatusThunk} from '../store/admin'

export class Admin extends Component {
  componentDidMount() {
    this.props.getAllOrders()
    this.props.getAllUsers()
  }

  render() {
//    console.log(this.props, 'PROPSSSSSSSSS')
    return (
      <div>
        <section>
          <h1>Admin Panel</h1>
          <h2>All Orders</h2>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Creation Date</th>
                  <th>User Id</th>
                  <th>Fullfillment Status</th>
                  <th>Total Price</th>
                  <th>Delete Entry</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>
                {this.props.allOrders[0] &&
                  this.props.allOrders.map(el => {
                    return (
                      <tr key={el.id}>
                        <td>{el.id}</td>
                        <td>{el.createdAt}</td>
                        <td>{el.userId}</td>
                        <td>
                          <select
                            onChange={evt =>
                              this.props.changeStatus(el.id, evt.target.value)
                            }
                            className="adminSelect"
                          >
                            <option value="test">
                              {el.fullfillmentStatus}
                            </option>
                            <option value="Unfullfilled">Unfullfilled</option>
                            <option value="Delivered">Delivered</option>
                            <option value="inCart">inCart</option>
                          </select>
                        </td>
                        <td>{el.totalPrice}</td>
                        <td>
                          <button>x</button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2>All Users</h2>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date Joined</th>
                  <th>First Name </th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Is Admin</th>
                  <th>Delete User</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>
                {this.props.allUsers[0] &&
                  this.props.allUsers.map(el => {
                    return (
                      <tr key={el.id}>
                        <td>{el.id}</td>
                        <td>{el.createdAt}</td>
                        <td>{el.firstName}</td>
                        <td>{el.lastName}</td>
                        <td>{el.email}</td>
                        <td>{String(el.isAdmin)}</td>

                        <td>
                          <button>x</button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    )
  }
}

const mapState = state => ({
  allOrders: state.admin.allOrdersArr,
  allUsers: state.admin.allUsersArr
})

const mapDispatch = dispatch => ({
  getAllOrders: () => dispatch(getAllOrdersThunk()),
  getAllUsers: () => dispatch(getAllUsersThunk()),
  changeStatus: (orderId, status) =>
    dispatch(changeOrderStatusThunk(orderId, status))
})

export default connect(mapState, mapDispatch)(Admin)
