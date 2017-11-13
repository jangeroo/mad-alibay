import React, { Component } from 'react';
import backend from './backend/firebase-backend.js';


class CreateItem extends Component {

    _handleFormSubmit = async event => {
        event.preventDefault();
        let image = 'https://www.thepaperworker.com/media/extendware/ewimageopt/media/inline/85/8/generic-product-54d.jpg'
        await backend.createListing(this.props.sellerID, this.inputPrice.value, image, this.inputBlurb.value)
        this.inputPrice.value = ''
        this.inputBlurb.value = ''
    }

    render() {
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