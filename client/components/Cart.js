import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, deleteCartItemThunk} from '../store/orders'

export class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }
  render() {
    let lineItems
    if (this.props.userCart[0]) {
      lineItems = this.props.userCart[0].lineItems
      console.log(lineItems)
    }

    return (
      <div>
        <h1>Here is my Cart</h1>
        <h2>
          {lineItems &&
            lineItems.map(elem => {
              return (
                <React.Fragment key={elem.id}>
                  <div className="card">
                    <img className="preview" src={elem.product.imageUrl} />
                    {elem.product.name}
                    <button
                      type="button"
                      onClick={() => this.props.deleteCart(elem.id)}
                    >
                      x
                    </button>
                  </div>
                </React.Fragment>
              )
            })}
        </h2>
      </div>
    )
  }
}

const mapState = state => ({
  userCart: state.orders.cartArr
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  deleteCart: id => dispatch(deleteCartItemThunk(id))
})

export default connect(mapState, mapDispatch)(Cart)
