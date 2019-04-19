import React from 'react'
import {connect} from 'react-redux'
import {loadProduct} from '../store/single-product'
import {addItemThunk, getCartThunk} from '../store/orders'

class ProductPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentDidMount() {
    await this.props.loadProduct(this.props.match.params.productId).then(
      this.setState({
        loaded: true
      })
    )
    this.props.getCart()
  }

  componentDidUpdate(prevState) {
    if (
      prevState.match.params.productId !== this.props.match.params.productId
    ) {
      this.props.loadProduct(this.props.match.params.productId)
    }
  }

  render() {
    if (!this.state.loaded) {
      return <h1>Loading...</h1>
    }
    console.log(this.props.order, 'ORDER')
    console.log(
      'SINGLE PROPS',
      this.props.order.cartArr[0] ? this.props.order.cartArr[0].id : null
    )
    console.log(this.props.order, 'CART')
    const product = this.props.product
    return (
      <div>
        <img src={product.imageUrl} />
        <h1>{product.name}</h1>
        <button
          onClick={() =>
            this.props.addProduct(
              this.props.order.cartArr[0]
                ? this.props.order.cartArr[0].id
                : null,
              product.id,
              1
            )
          }
        >
          Add to Cart
        </button>
        {(product.price / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.orders,
    product: state.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCartThunk()),
    loadProduct: id => dispatch(loadProduct(id)),
    addProduct: (orderId, productId, quant) =>
      dispatch(addItemThunk(orderId, productId, quant))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
