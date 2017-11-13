import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backend from './backend/firebase-backend.js';

class Catelogue extends Component {

    _handleBuyClick = () =>{
        let buyerID = this.props.buyerID ? this.props.buyerID : backend.genUID();
        backend.buy(buyerID, this.props.item.productID);
    }


    render() {
        return (
            <div className="item-container">
                <div className="item-image">
                    <img src={this.props.item.image} alt=""/>
                </div>
                <div className="item-details">
                    <Link to={`/browse/${this.props.item.productID}`}><div className="item-blurb">{this.props.item.blurb}</div></Link>
                    <div className="item-price">{Number(this.props.item.price).toLocaleString('en')}</div>
                    {this.props.addToCart ? (<Link to='/purchaseHistory' className="btn" onClick={this._handleBuyClick}>1-Click Buy</Link>) : (<div></div>)}
                </div>
            </div>
        );
    }

}

export default Catelogue;