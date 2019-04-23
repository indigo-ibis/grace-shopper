import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartThunk,
  deleteCartItemThunk,
  updateCartItemThunk
} from '../store/orders'
import {Link} from 'react-router-dom'

// import axios from 'axios'

export class Cart extends Component {
  state = {
    loaded: false,
    isErr: false
  }
  async componentDidMount() {
    await this.props.getCart().then(() => this.setState({loaded: true}))
  }

  render() {
    if (this.state.loaded) {
      let lineItems
      if (this.props.userCart) {
        lineItems = this.props.userCart.lineItems
      }
      if (!localStorage.getItem('Cart')) {
        localStorage.setItem('Cart', 'for guest')
      }
      return this.state.isErr ? (
        <h1>Uh oh...</h1>
      ) : (
        <div>
          <h1>Here is my Cart</h1>
          <div className="cartDisplay">
            {lineItems &&
              lineItems.map(elem => {
                return (
                  <div className="singleLineItem" key={elem.id}>
                    <div>
                      {elem.product.name}
                      <br />
                      <b>Quantity:</b> {elem.quantity}
                      <br />
                      <b>Price</b>:{' '}
                      {(
                        elem.quantity *
                        elem.product.price /
                        100
                      ).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => this.props.deleteCart(elem.id)}
                        className="delete"
                      >
                        x
                      </button>
                      <select
                        defaultValue={elem.quantity}
                        onChange={evt =>
                          this.props
                            .updateCart(evt.target.value, elem.id)
                            .catch(err => this.setState({isErr: true}))
                        }
                      >
                        {Array.from({length: 10}, (x, i) => i + 1).map(val => (
                          <option value={val}>{val}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )
              })}
          </div>
          <h1>
            Total Price:{' '}
            {(this.props.userCart.totalPrice / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </h1>
          <Link to="/checkout">Proceed to CheckOut</Link>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

const mapState = state => ({
  userCart: state.orders.cartArr
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  deleteCart: id => dispatch(deleteCartItemThunk(id)),
  updateCart: (quantity, id) => dispatch(updateCartItemThunk(quantity, id))
})

export default connect(mapState, mapDispatch)(Cart)
