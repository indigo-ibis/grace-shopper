import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartThunk,
  deleteCartItemThunk,
  updateCartItemThunk
} from '../store/orders'

// import axios from 'axios'

export class Cart extends Component {
  state = {
    isErr: false
  }
  componentDidMount() {
    this.props.getCart()
  }
  render() {
    let lineItems
    if (this.props.userCart[0]) {
      lineItems = this.props.userCart[0].lineItems
    }
    return this.state.isErr ? (
      <h1>Uh oh...</h1>
    ) : (
      <div>
        <h1>Here is my Cart</h1>
        <h2>
          {lineItems &&
            lineItems.map(elem => {
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
                    onChange={
                      evt => this.props.updateCart(evt.target.value, elem.id)
                      // axios
                      //   .put('/api/orders/cart', {
                      //     quantity: evt.target.value,
                      //     id: elem.id
                      //   })
                      // .catch(err => {
                      //   this.setState({isErr: true})
                      // })
                    }
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </React.Fragment>
              )
            })}
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
  deleteCart: id => dispatch(deleteCartItemThunk(id)),
  updateCart: (quantity, id) => dispatch(updateCartItemThunk(quantity, id))
})

export default connect(mapState, mapDispatch)(Cart)
