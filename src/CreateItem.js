import React, { Component } from 'react';
import backend from './backend/firebase-backend.js';
import firebase from 'firebase';

let imgURL="";

class CreateItem extends Component {

    constructor() {
        super();
        this.state = { createdListing: null, imgURL: "", imageName: 0 }
    }

    _handleFormSubmit = async event => {
        event.preventDefault();
        await backend.createListing(this.props.userID, this.inputPrice.value, imgURL, this.inputBlurb.value)
        .then(listingID => {this.setState({ createdListing: listingID, imgURL: imgURL })
        console.log(this.state.imgURL, "cool");
    })
        
    }

    _createAnotherItem = event => {
        this.setState({ createdListing: null, imgURL: ""})
    }

    _uploadToStorage = async (img) => {
        await this.setState({ imageName: backend.genUID() })
        await firebase.storage().ref(`/listingsImages/${this.state.imageName}`).put(img);
        this._getImgURL();
    }

    _getImgURL = async () => {
        await firebase.storage().ref(`/listingsImages/${this.state.imageName}`).getDownloadURL().then((url) => {
            imgURL=url;
        });
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
                        <input type="file" id="input" onChange={e => this._uploadToStorage(e.target.files[0])} />
                    <button className="btn">Create</button>
                    </div>

                </form>
            </div>
        )
    }

}

export default CreateItem;