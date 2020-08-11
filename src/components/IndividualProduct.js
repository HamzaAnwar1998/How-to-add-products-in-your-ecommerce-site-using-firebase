import React, { Component } from 'react'

export class IndividualProduct extends Component {
    render() {
        const { title, price, img, id } = this.props.product
        return (
            <div className='container main-div'>
                <div className='img-div' onClick={this.props.setSelectedImg.bind(this, img)}>
                    <img src={img} alt="" />
                </div><br />
                <div>{title}</div>
                <div>{price}</div><br />
                <button className='btn btn-danger btn-sm btn-block' onClick={this.props.delete.bind(this, id)}>DELETE</button>
            </div>
        )
    }
}

export default IndividualProduct
