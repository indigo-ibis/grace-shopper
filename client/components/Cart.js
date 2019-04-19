import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, deleteCartItemThunk, updateQuantityThunk} from '../store/orders'

export class Cart extends Component {
  constructor(){
    super()
    this.state = {
      options: [1,2,3,4,5,6,7,8,9,10],
      value: 1
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  componentDidMount() {
    this.props.getCart()
  }

  render() {
    let lineItems
    if (this.props.userCart[0]) {
      lineItems = this.props.userCart[0].lineItems
    }
    const { options, value } = this.state;

    return (
      <div>
        <h1>Here is my Cart</h1>
        <h2>
          {lineItems &&
            lineItems.map(elem => {
              return (
                <React.Fragment key={elem.id}>
                  <li>{elem.product.name}</li>

                  <select name="Quantity" size="10" onChange={this.handleChange} >
                    {options.map(num => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))
                    }
                  </select>
                  <button
                    type="button"
                    onClick={() => this.props.updateQuantity(elem.id, value)}>
                    Update Quantity
                  </button>

                  <button
                    type="button"
                    onClick={() => this.props.deleteCart(elem.id)}>
                    x
                  </button>
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
  deleteCart: id => dispatch(deleteCartItemThunk(id)),
  updateQuantity: (id, val) => dispatch(updateQuantityThunk(id, val))
})

export default connect(mapState, mapDispatch)(Cart)
