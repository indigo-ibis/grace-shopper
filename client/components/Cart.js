import React from 'react'
import {Link} from 'react-router-dom'
import {CartDisplay} from '.'

export default () => {
  return (
    <div>
      <h1>Here is my Cart</h1>
      <CartDisplay />
      <Link to="/checkout">Proceed to CheckOut</Link>
    </div>
  )
}
