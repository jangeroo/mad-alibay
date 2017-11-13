import React, { Component } from 'react';
import Catelogue from './Catelogue.js';
import backend from './backend/firebase-backend.js';

class PurchaseHistory extends Component {

    constructor() {
        super();
        this.state = { purchasedItems: [] }
    }

    componentWillMount() {
        if (this.props.buyerID) this._getPurchaseHistory(this.props.buyerID);
    }

    _getPurchaseHistory = buyerID => {
        backend.allItemsBought(buyerID)
            .then(listingIDs => {
                let arrItemObjs = []
                listingIDs.forEach(ID => {
                    backend.getItemDescription(ID)
                        .then(item => {
                            const itemObj = { productID: ID, blurb: item.blurb, image: item.image, price: item.price }
                            arrItemObjs.push(itemObj);
                            this.setState({ purchasedItems: arrItemObjs });
                        })
                })
            })
    }
    render() {

        return (
            <div className="purchased-items-container">
                {this.state.purchasedItems.map(item => {
                    return (<div className="catelogue-container" key={item.blurb}><Catelogue item={item} addToCart={false} buyerID={this.props.buyerID} /></div>)
                }
                )}
            </div>
        );
    }

}

export default PurchaseHistory;