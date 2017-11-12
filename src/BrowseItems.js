import React, { Component } from 'react';
import Catelogue from './Catelogue.js';
import SearchBar from './SearchBar.js';
import backend from './backend/firebase-backend.js';

class BrowseItems extends Component {

    constructor() {
        super();
        this.state = { itemsForSale: [] }
    }

    componentWillMount() {
        this._getItemsForSale('');
    }

    _getItemsForSale = searchTerm => {
        // console.log(`getting items that match: "${searchTerm}`)
        backend.searchForListings(searchTerm)
            .then(listings => {
                let arrItemObjs = []
                listings.forEach(ID => {
                    backend.getItemDescription(ID)
                        .then(item => {
                            const itemObj = { productID: ID, blurb: item.blurb, image: item.image, price: item.price }
                            arrItemObjs.push(itemObj);
                            this.setState({ itemsForSale: arrItemObjs });
                        })
                })
            })
    }


    render() {

        return (
            <div className="category-container">
                <SearchBar onResult={this._getItemsForSale} />

                {this.state.itemsForSale.map(item => {
                    return (<div className="catelogue-container" key={item.blurb}><Catelogue item={item} /></div>)
                }
                )}
            </div>
        );
    }

}

export default BrowseItems;