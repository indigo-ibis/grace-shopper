import React from 'react'
import {Link} from 'react-router-dom'
import {CartDisplay} from '.'

export default () => {
  return (
    <div className="cart">
      <h1>Cart</h1>
      <hr />
      <CartDisplay />
      <Link to="/checkout">
        <h2 className="proceed-checkout">Proceed to CheckOut</h2>
      </Link>
    </div>
  )
}
