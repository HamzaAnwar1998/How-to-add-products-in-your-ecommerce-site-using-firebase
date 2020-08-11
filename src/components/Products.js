import React, { Component } from 'react'
import IndividualProduct from './IndividualProduct'

export class Products extends Component {
    render() {
        return this.props.products.map((product) => (
            <IndividualProduct product={product} key={product.id}
            delete={this.props.delete} setSelectedImg={this.props.setSelectedImg} />
        ))
    }
}

export default Products
