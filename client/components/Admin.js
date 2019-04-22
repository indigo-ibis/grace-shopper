import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrdersThunk} from '../store/admin'

export class Admin extends Component {
  componentDidMount() {
    this.props.getAllOrders()
  }

  render() {
    console.log(this.props, 'PROPSSSSSSSSS')
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
                        <td>-{el.userId}</td>
                        <td>
                          <select>
                            <option value="test">
                              {el.fullfillmentStatus}
                            </option>
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
      </div>
    )
  }
}

const mapState = state => ({
  allOrders: state.admin.allOrdersArr
})

const mapDispatch = dispatch => ({
  getAllOrders: () => dispatch(getAllOrdersThunk())
})

export default connect(mapState, mapDispatch)(Admin)
