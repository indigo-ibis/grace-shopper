import React from 'react'
import {connect} from 'react-redux'
import {loadSelectedProducts} from '../store'
import {SingleProductDisplay} from '.'
import queryString from 'query-string'

class productsDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentDidMount() {
    const queries = queryString.parse(this.props.location.search)
    const productCategoryName = queries.category || null
    let houseName = null;
    if (queries.house) {
      houseName = queries.house[0].toUpperCase() + queries.house.slice(1).toLowerCase()
    }
    await this.props.loadSelectedProducts(houseName, productCategoryName).then(
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
        {this.props.products.map(product => (
          <SingleProductDisplay key={product.id} {...product} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSelectedProducts: (house, category) =>
      dispatch(loadSelectedProducts(house, category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(productsDisplay)
