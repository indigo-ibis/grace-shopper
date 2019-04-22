import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import '../../secrets'

class PurchaseBtn extends Component {
  onToken = async token => {
    const {totalPrice} = this.props.userCart[0]
    const {id, email} = token
    const data = {
      currency: 'usd',
      email,
      tokenId: id,
      totalPrice,
      name: token.card.name
    }
    try {
      const res = await axios.post('api/checkout', data)
      await axios.put('/api/orders/checkout')
      this.props.history.push('/')
    } catch (err) {
      console.log('error')
      console.error(err.message)
    }
  }
  // onOpened() {
  //   console.log('hi')
  // }
  // onClosed() {
  //   console.log(this.props, this.state)
  // }

  render() {
    const apiKey = process.env.STRIPE_API_KEY
    const {totalPrice} = this.props.userCart[0] ? this.props.userCart[0] : 0
    return (
      <StripeCheckout
        stripeKey={apiKey}
        token={this.onToken}
        name="Game of Shopper"
        description="Get Your GoT Merchandise"
        amount={totalPrice}
        image="https://stripe.com/img/documentation/checkout/marketplace.png"
        label="Here, Take my money"
        panelLabel="Money me"
        email="test@user.com"
        locale="auto"
        currency="USD"
        alipay
        bitcoin
        billingAddress
        shippingAddress
        zipCode
        opened={this.onOpened}
        closed={this.onClosed}
        {...this.state}
      />
    )
  }
}

export default PurchaseBtn
