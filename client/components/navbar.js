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

        <div>
          <Link to="/products"> All Products </Link>
        </div>

        <hr />
        <div>
          {isLoggedIn ? (
            <div>
              <a href="#" onClick={this.props.handleClick}>
                {' '}
                Logout{' '}
              </a>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>

        <div>
          <Link to="/products?house=stark"> Stark </Link>
          <Link to="/products?house=targaryan"> Targaryan </Link>
          <Link to="/products?house=lannister"> Lannister </Link>
          <Link to="/products?house=tyrell"> Tyrell </Link>
          <Link to="/products?house=baratheon"> Baratheon </Link>
          <Link to="/products?house=greyjoy"> Greyjoy </Link>
          <Link to="/products?house=tully"> Tully </Link>
        </div>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    handleClick() {
      dispatch(logout())
    },
    setFilter() {
      dispatch(setFilter())
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
