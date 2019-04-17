import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadSelectedProducts} from './../store'

class productsDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded : false
        }
    }

    async componentDidMount() {
<<<<<<< HEAD
        const houseName = this.props.match.params.house
        await this.props.loadSelectedProducts(houseName[0].toUpperCase() + houseName.slice(1).toLowerCase() || null)
=======
        let houseName = productCategoryName = null;
        if (this.props.match.params.house) {
            houseName = this.props.match.params.house[0].toUpperCase() + this.props.match.params.house.slice(1).toLowerCase()
        }
        if (this.props.match.params.category) {
            productCategoryName = this.props.match.params.category
        }
        await this.props.loadSelectedProducts()
>>>>>>> master
        .then( this.setState({
            loaded : true
        }) )
    }

    render() {
        console.log(this.props.products)
        if (!this.state.loaded) {return <h1>Loading...</h1>}
        return (
            <div>
                {this.props.products.map(product => <h1 key={product.id}>{product.name}</h1>)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products : state.products,
        filters : state.filters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadSelectedProducts : (house, category) => dispatch(loadSelectedProducts(house, category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(productsDisplay)
