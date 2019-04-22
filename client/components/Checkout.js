import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/orders'
import PurchaseBtn from './PurchaseBtn'

class Checkout extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    if(!this.props.userCart.userId){
      this.props.history.push('/')
    }
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
