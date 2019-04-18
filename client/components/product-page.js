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

  render() {
    if (!this.state.loaded) {
      return <h1>Loading...</h1>
    }
    return (
      <div>
        <img src={this.props.product.imageUrl}></img>
        <h1>{this.props.product.name}</h1>
        {this.props.product.price}
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
