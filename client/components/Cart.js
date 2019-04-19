import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartThunk,
  deleteCartItemThunk
  // updateCartItemThunk
} from '../store/orders'

import axios from 'axios'

export class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }
  render() {
    let lineItems
    if (this.props.userCart[0]) {
      lineItems = this.props.userCart[0].lineItems
    }
    return (
      <div>
        <h1>Here is my Cart</h1>
        <h2>
          {lineItems &&
            lineItems
              .map(elem => {
                return (
                  <React.Fragment key={elem.id}>
                    <li>{elem.product.name}</li>
                    <li>Quant:{elem.quantity}</li>
                    <li>ID: {elem.id}</li>
                    <button
                      type="button"
                      onClick={() => this.props.deleteCart(elem.id)}
                    >
                      x
                    </button>
                    <select
                      defaultValue={elem.quantity}
                      onChange={e =>
                        axios
                          .put('/api/rders/cart', {
                            quantity: e.target.value,
                            id: elem.id
                          })
                          .catch(err => console.log(err))
                      }
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </select>
                  </React.Fragment>
                )
              })
              .sort((a, b) => a.createdAt < b.createdAt)}
        </h2>
      </div>
    )
  }
}

const mapState = state => ({
  userCart: state.orders.cartArr
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  deleteCart: id => dispatch(deleteCartItemThunk(id))
  // editQuantity: num => dispatch(updateCartItemThunk(num))
})

export default connect(mapState, mapDispatch)(Cart)
