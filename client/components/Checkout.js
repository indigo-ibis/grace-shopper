import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/orders'
import PurchaseBtn from './PurchaseBtn'
import {CartDisplay} from '.'

class Checkout extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    if (Object.keys(this.props.userCart).length && !this.props.userEmail) {
      this.props.history.push('/signup')
    }
    return (
      <div>
        {this.props.userCart.lineItems &&
        this.props.userCart.lineItems.length ? (
          <div className="order-review">
            <h1>Review Your Order</h1>
            <hr />
            <CartDisplay displayOnly={true} />
            <div className="purchase">
              <PurchaseBtn {...this.props} />
            </div>
          </div>
        ) : (
          <h1>There is Nothing in your cart.</h1>
        )}
      </div>
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
