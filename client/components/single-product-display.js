import React from 'react'
import {Link} from 'react-router-dom'

export default props => {
  return (

    <div className='singleProductCell'>
      <img className='preview' src={props.imageUrl}></img>
      <h3><Link to={`/products/${props.id}`}>{props.name}</Link></h3>
      Price: {(props.price / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
    </div>
  )
}
