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
          <h2>
            {lineItems &&
              lineItems.map(elem => {
                return (
                  <React.Fragment key={elem.id}>
                    <li>{elem.product.name}</li>
                    <li>Quantity:{elem.quantity}</li>
                    <li>ID: {elem.id}</li>
                    <button
                      type="button"
                      onClick={() => this.props.deleteCart(elem.id)}
                      className='delete'
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
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                    </select>
                  </React.Fragment>
                )
              })}
          </h2>
          <Link to="/checkout">Proceed to CheckOut</Link>
        </div>
      )
    }
    else {
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
