import React, { Component } from 'react';
import Catelogue from './Catelogue.js';
import backend from './backend/firebase-backend.js';

class SellHistory extends Component {

    constructor() {
        super();
        this.state = { soldItems: []}
    }

    componentWillMount() {
        if (this.props.userID) this._getSellHistory(this.props.userID);
    }

    _getSellHistory = userID => {
        backend.allItemsSold(userID)
            .then(listingIDs => {
                let arrItemObjs = []
                listingIDs.forEach(ID => {
                    backend.getItemDescription(ID)
                        .then(item => {
                            const itemObj = { productID: ID, blurb: item.blurb, image: item.image, price: item.price }
                            arrItemObjs.push(itemObj);
                            this.setState({ soldItems: arrItemObjs });
                        })
                })
            })
    }

    render() {

        return (
            <div className="sold-items-container">
                <div>
                    <h3>Here's what you've sold so far:</h3>
                </div>
                {this.state.soldItems.map(item => {
                    return (<div className="catelogue-container" key={item.blurb}><Catelogue item={item} addToCart={false} userID={this.props.userID} /></div>)
                })}
            </div>
        );
    }

}

export default SellHistory;