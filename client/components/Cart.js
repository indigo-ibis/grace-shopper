import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, deleteCartItemThunk} from '../store/orders'

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
            lineItems.map(elem => {
              return (
                <React.Fragment key={elem.id}>
                  <li>{elem.product.name}</li>
                  <button
                    type="button"
                    onClick={() => this.props.deleteCart(elem.id)}
                  >
                    x
                  </button>
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
  deleteCart: id => dispatch(deleteCartItemThunk(id))
})

export default connect(mapState, mapDispatch)(Cart)
