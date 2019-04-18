import React from 'react'
import {Link} from 'react-router-dom'

export default props => {
  return (
    <div>
      <h1><Link to={`/products/${props.id}`}>{props.name}</Link></h1>
      Price: {(props.price / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
    </div>
  )
}
