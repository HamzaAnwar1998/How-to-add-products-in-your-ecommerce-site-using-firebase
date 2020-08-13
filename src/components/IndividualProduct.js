import React, { Component } from 'react'
import { motion } from 'framer-motion'

export class IndividualProduct extends Component {
    render() {
        const { id, title, price, img } = this.props.product
        return (
            <div className='container main-div'>
                <motion.div className='img-div' onClick={this.props.setSelectedImg.bind(this, img)}
                    whileHover={{ opacity: 1 }}>
                    <motion.img src={img} alt=""
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }} />
                </motion.div>
                <br />
                <div>{title}</div>
                <div>{price}</div><br />
                <button className='btn btn-danger btn-sm btn-block' onClick={this.props.delete.bind(this, id)}>DELETE</button>
            </div>
        )
    }
}

export default IndividualProduct
