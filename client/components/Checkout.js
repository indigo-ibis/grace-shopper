import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/orders'

class Checkout extends Component {
  componentDidMount() {
    this.props.getCart()
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log('checking out')
  }

  render() {
    return (
      <>
        <div>This is our Checkout</div>
        <button type="click" onClick={this.handleSubmit}>
          Submit Order
        </button>
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
