import React, { Component } from 'react'
import IndividualProduct from './IndividualProduct'

export class Products extends Component {
    render() {
        return this.props.products.map(product => (
            <IndividualProduct key={product.id} product={product}
                delete={this.props.delete}
                setSelectedImg={this.props.setSelectedImg} />
        ))
    }
}

export default Products
