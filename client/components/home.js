import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Banners from './Banners'

/**
 * COMPONENT
 */
export const Home = props => {
  const {email} = props
  if (props.isAdmin) {
    props.history.push('/admin')
  }

  return (
    // <div className="front-page">
    //   <div>Houses</div>
    //   <div className="banners">
    //     <Link to="/products?house=stark">
    //       <img src="/Stark.jpg" />
    //     </Link>
    //     <Link to="/products?house=targaryan">
    //       <img src="/Targaryen.jpg" />
    //     </Link> ious week out of that announcement do not leaveWe are
    //     <Link to="/products?house=lannister">
    //       <img src="/Lannister.jpg" />
    //     </Link>
    //     <Link to="/products?house=tyrell">
    //       <img src="/Tyrell.jpg" />
    //     </Link>
    //     <Link to="/products?house=baratheon">
    //       <img src="/Baratheon.jpg" />
    //     </Link>
    //     <Link to="/products?house=greyjoy">
    //       <img src="/Greyjoy.jpg" />
    //     </Link>
    //     <Link to="/products?house=tully">
    //       <img src="/Martell.jpg" />
    //     </Link>
    //   </div>
    // </div>
    <>{/* <Banners /> */}</>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {
  email: PropTypes.string
}
