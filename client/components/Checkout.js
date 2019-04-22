import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/orders'
import PurchaseBtn from './PurchaseBtn'

class Checkout extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  // handleClick = () => {
  //   axios.put('/api/orders/checkout')
  //   console.log('order submitted')
  // }

  render() {
    return (
      <>
        <div>Review Your Order</div>
        <PurchaseBtn {...this.props} />
      </>
    )
  }
}
const mapStateToProps = state => ({
  userCart: state.orders.cartArr
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
