import React, { Component } from 'react';
import backend from './backend/firebase-backend.js';


class CreateItem extends Component {

    constructor() {
        super();
        this.state = { createdListing: null }
    }

    _handleFormSubmit = async event => {
        event.preventDefault();
        let image = 'https://www.thepaperworker.com/media/extendware/ewimageopt/media/inline/85/8/generic-product-54d.jpg'
        let listintgID = await backend.createListing(this.props.sellerID, this.inputPrice.value, image, this.inputBlurb.value)
        this.inputPrice.value = ''
        this.inputBlurb.value = ''
        this.setState({createdListing: listintgID})
    }

    _createAnotherItem = event => {
        this.setState({createdListing: null})
    }

    render() {
        if (this.state.createdListing) return (
            <div>
                <h2>Item created successfully.</h2>
                <button onClick={this._createAnotherItem} className="btn">Create another item</button>
            </div>
        )
        return (
            <div className="CreateItem">
                <form onSubmit={this._handleFormSubmit}>
                    <div>
                        <input ref={r => this.inputBlurb = r} placeholder="Blurb" />
                        <input ref={r => this.inputPrice = r} placeholder="Price" />
                    </div>
                    <button className="btn">Create</button>
                </form>
            </div>
        )
    }

}

export default CreateItem;