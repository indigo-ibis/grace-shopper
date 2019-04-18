import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/orders'

export class Cart extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getCart()
  }
  render() {
    let {order, productInfo} = this.props.userCart
    return (
      <div>
        <h1>Here is my Cart</h1>
        <h2>
          {productInfo &&
            productInfo.map(elem => <li key={elem.id}>{elem.name}</li>)}
        </h2>
      </div>
    )
  }
}

const mapState = state => ({
  userCart: state.orders.cartArr
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(getCartThunk())
})

export default connect(mapState, mapDispatch)(Cart)
