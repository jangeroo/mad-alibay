import React, { Component } from 'react';
import Catelogue from './Catelogue.js';
import backend from './backend/firebase-backend.js';
import { Link } from 'react-router-dom';

class PurchaseHistory extends Component {

    constructor() {
        super();
        this.state = { purchasedItems: [] }
    }

    componentWillMount() {
        if (this.props.userID) this._getPurchaseHistory(this.props.userID);
    }

    _getPurchaseHistory = userID => {
        backend.allItemsBought(userID)
            .then(listingIDs => {
                console.log(listingIDs);
                let arrItemObjs = []
                listingIDs.forEach(ID => {
                    backend.getItemDescription(ID)
                        .then(item => {
                            const itemObj = { productID: ID, blurb: item.blurb, image: item.image, price: item.price, forSale: item.forSale }
                            arrItemObjs.push(itemObj);
                            this.setState({ purchasedItems: arrItemObjs });
                        })
                })
            })
    }

    render() {
        console.log(this.props.userID);

        return (
            this.props.userID ? (
            <div className="purchased-items-container">
                <div>
                    <h1>Thanks for shopping with us!</h1>
                    <h3>Here's what you've purchased so far:</h3>
                </div>
                {this.state.purchasedItems.map(item => {
                    return (<div className="catelogue-container" key={item.blurb}><Catelogue item={item} addToCart={item.forSale} userID={this.props.userID} /></div>)
                })}
            </div>) :
            (<div className="non-user"> <h2>Thank You for purchasing an item!</h2>
            <Link to='/browse' className="btn">Continue Shopping</Link>
            </div>)
        );
    }

}

export default PurchaseHistory;