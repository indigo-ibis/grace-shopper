import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Link, NavLink} from 'react-router-dom'
import {me, logout} from '../store'
/**
 * COMPONENT
 */
class Navbar extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <NavLink to="/">
          <img src="/GOTheader.jpg" />
        </NavLink>

        <div id='topBar'>
          <span>Hello, <b>{this.props.name}</b></span>
          {isLoggedIn ? (
              <span>
                <a href="#" onClick={this.props.handleClick}>
                  {' '}
                  Logout{' '}
                </a>
              </span>
          ) : (
              <span>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </span>
          )}
        </div>

        <div>
          <Link to="/products"> All Products </Link>
          <Link to="/cart"> My Shopping Cart </Link>
        </div>

        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    name: state.user.firstName ? state.user.firstName + ' ' + state.user.lastName : 'Guest'
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
