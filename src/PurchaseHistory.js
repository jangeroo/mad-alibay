import React, { Component } from 'react';
import Catelogue from './Catelogue.js';
import backend from './backend/firebase-backend.js';
import { Link } from 'react-router-dom';

class PurchaseHistory extends Component {

    constructor() {
        super();
        this.state = { purchasedItems: [], boughtSingleItem: false }
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
            this.props.buyerID ? (
            <div className="purchased-items-container">
                {this.state.purchasedItems.map(item => {
                    return (<div className="catelogue-container" key={item.blurb}><Catelogue item={item} addToCart={false} buyerID={this.props.buyerID} /></div>)
                })}
            </div>) :
            (<div className="non-user"> <h2>Thank You for purchasing an item!</h2>
            <Link to='/browse' className="btn">Continue Shopping</Link>
            </div>)
        );
    }

}

export default PurchaseHistory;