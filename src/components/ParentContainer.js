import React, { Component } from 'react'
import Form from './Form'
import Products from './Products'
import fire from '../config/Config'
import Modal from './Modal'

export class ParentContainer extends Component {
    // defining initial state
    state = {
        id: Math.floor(Math.random() * 100000),
        step: 1,
        products: [],
        selectedImg: null, // this will be used in modal
        progress: null // this will be used in progress bar
    }

    componentDidMount() {
        const prevState = this.state.products;
        fire.firestore().collection('products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevState.push({
                        id: change.doc.data().id,
                        title: change.doc.data().title,
                        price: change.doc.data().price,
                        img: change.doc.data().img
                    })
                }
                else if (change.type === 'removed') {
                    for (var i = 0; i < prevState.length; i++) {
                        if (prevState[i].id === change.doc.id) {
                            prevState.splice(i, 1);
                        }
                    }
                }
                this.setState({
                    products: prevState
                })
            })
        })
    }

    // defining methods

    // nextStep will move us to next screen
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    // prevStep will move us to previous screen
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    // addProducts
    addProducts = (title, price, img) => {
        // generating new id
        const date = new Date();
        const time = date.getTime();
        const id = '_' + time;
        this.setState({
            id: id
        })
        const storage = fire.storage();
        const uploadTask = storage.ref(`images/${img.name}`).put(img);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(progress);
            this.setState({
                progress: progress
            })
        }, error => {
            console.log(error.message)
        }, () => {
            storage.ref('images').child(img.name).getDownloadURL().then(url => {
                fire.firestore().collection('products').doc(this.state.id).set({
                    id: this.state.id,
                    title,
                    price,
                    img: url
                })
                this.setState({
                    progress: null
                })
            })
        })
    }

    // delete
    delete = (id) => {
        fire.firestore().collection('products').doc(id).delete();
        // console.log(id);
    }

    // setSelectedImg function
    setSelectedImg = (img) => {
        // console.log(img);
        this.setState({
            selectedImg: img
        })
    }

    render() {
        const { step } = this.state;
        switch (step) {
            case 1:
                return (
                    <Form nextStep={this.nextStep}
                        addProducts={this.addProducts}
                        progress={this.state.progress} />
                )
            case 2:
                return (
                    <>
                        <div className='header text-center'>Your Products</div>
                        <br />
                        <div className='container'>
                            <div className='products-box'>
                                <Products products={this.state.products}
                                    delete={this.delete}
                                    setSelectedImg={this.setSelectedImg} />
                                {this.state.selectedImg && <Modal selectedImg={this.state.selectedImg}
                                setSelectedImg={this.setSelectedImg} />}
                            </div>
                            <button className='btn btn-info btn-block' onClick={this.prevStep}>BACK</button>
                            <br />
                        </div>
                    </>
                )
        }
    }
}

export default ParentContainer
