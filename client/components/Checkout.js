import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/orders'
import PurchaseBtn from './PurchaseBtn'

class Checkout extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    if (Object.keys(this.props.userCart).length && !this.props.userEmail) {
      this.props.history.push('/login')
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
  userCart: state.orders.cartArr,
  userEmail: state.user.email
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
