import React, { Component } from 'react'
import ProgressBar from './ProgressBar'

export class Form extends Component {
    // defining initial state
    state = {
        title: '',
        price: '',
        img: null
    }
    // continue will trigger nextStep which will increase step by 1
    continue = () => {
        this.props.nextStep()
    }
    // handle values
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // handle img
    handleImg = (e) => {
        if (e.target.files[0]) {
            this.setState({
                img: e.target.files[0]
            })
        }
    }
    // handleSubmit
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addProduct(this.state.title, this.state.price, this.state.img);
        this.setState({
            title: '',
            price: '',
            img: null
        })
        document.getElementById('file').value = '';
    }
    render() {
        console.log(this.props.progress);
        return (
            <>
                <div className='header text-center'>ADD PRODUCTS</div>
                <br />
                <div className='container'>
                    <form autoComplete='off' className='form-group' onSubmit={this.handleSubmit}>
                        {this.props.progress && <ProgressBar progress={this.props.progress} />}
                        <br />
                        <label htmlFor="title">Title</label>
                        <input type="text" className='form-control' name="title"
                            onChange={this.handleChange}
                            value={this.state.title} required /><br />
                        <label htmlFor="price">Price</label>
                        <input type="number" className='form-control' name="price"
                            onChange={this.handleChange}
                            value={this.state.price} required /><br />
                        <label htmlFor="image">Insert Image</label>
                        <input type="file" className='form-control'
                            onChange={this.handleImg} id='file' required
                        /><br />
                        <button type='submit' className='btn btn-success btn-block'>ADD</button>
                    </form>
                    <button type='button' className='btn btn-info btn-block' onClick={this.continue}>Check Products</button>
                </div >
            </>
        )
    }
}

export default Form

