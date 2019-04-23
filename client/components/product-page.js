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
  //className="fullSize"
  render() {
    if (!this.state.loaded) {
      return <h1>Loading...</h1>
    }
    const product = this.props.product
    return (
      <div className="itemInfo">
        <img src={product.imageUrl} />
        <div>
          <h1 style={{color: 'white'}}>{product.name}</h1>
          <div className="itemInfo1">
            <span>
              {(product.price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </span>
            <span>
              <button onClick={() => this.props.addProduct(product.id, 1)}>
                Add to Cart
              </button>
            </span>
          </div>
        </div>
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
    addProduct: (productId, quant) => dispatch(addItemThunk(productId, quant))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
