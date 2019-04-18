import React from 'react'
import {connect} from 'react-redux'
import {loadProduct} from '../store/single-product'

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
  }

  componentDidUpdate(prevState) {
    if (prevState.match.params.productId !== this.props.match.params.productId) {
      this.props.loadProduct(this.props.match.params.productId);
    }
  }

  render() {
    if (!this.state.loaded) {
      return <h1>Loading...</h1>
    }

    const product = this.props.product
    return (
      <div>
        <img src={product.imageUrl}></img>
        <h1>{product.name}</h1>
        {(product.price / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProduct: id => dispatch(loadProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
