import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartThunk,
  deleteCartItemThunk,
  updateCartItemThunk
} from '../store/orders'

class CartDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      isErr: false
    }
  }

  async componentDidMount() {
    await this.props
      .getCart()
      .then(() =>
        this.setState({
          loaded: true
        })
      )
      .catch(err =>
        this.setState({
          isErr: err
        })
      )
  }

  render() {
    if (this.state.isErr) {
      return <h1>Uh oh...</h1>
    }
    if (this.state.loaded) {
      const lineItems = this.props.userCart.lineItems || []

      const totalPrice = lineItems.reduce(
        (sum, lineItem) => sum + lineItem.quantity * lineItem.product.price,
        0
      )

      return (
        <div className="cartDisplay">
          {lineItems &&
            lineItems.map(elem => {
              return (
                <div className="singleLineItem" key={elem.id}>
                  <div className="lineItemInfo">
                    <div className="iteminfo-one">
                      <img className="preview" src={elem.product.imageUrl} />
                      {!this.props.displayOnly && (
                        <div>
                          <button
                            type="button"
                            onClick={() => this.props.deleteCart(elem.id)}
                            className="delete"
                          >
                            x
                          </button>
                          <select
                            defaultValue={elem.quantity}
                            onChange={evt =>
                              this.props
                                .updateCart(evt.target.value, elem.id)
                                .catch(err => this.setState({isErr: true}))
                            }
                          >
                            {Array.from({length: 10}, (x, i) => i + 1).map(
                              val => (
                                <option key={val} value={val}>
                                  {val}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )}
                    </div>
                    <div>
                      <b>{elem.product.name}</b>
                      <br />
                      <b>Quantity:</b> {elem.quantity}
                      <br />
                      <b>Price</b>:{' '}
                      {(
                        elem.quantity *
                        elem.product.price /
                        100
                      ).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          <h1>
            Total Price:{' '}
            {(totalPrice / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </h1>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

const mapState = state => ({
  userCart: state.orders.cartArr
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  deleteCart: id => dispatch(deleteCartItemThunk(id)),
  updateCart: (quantity, id) => dispatch(updateCartItemThunk(quantity, id))
})

export default connect(mapState, mapDispatch)(CartDisplay)
