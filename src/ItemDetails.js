import React, { Component } from 'react';
import backend from './backend/firebase-backend.js';
import Catelogue from './Catelogue.js';

class ItemDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: { productID: "", price: 0, blurb: "", image: "" }
        }

    }

    componentWillMount() {
        backend.getItemDescription(this.props.productID)
            .then(
            item => {
                this.setState({
                    item: { productID: this.props.productID, price: item.price, blurb: item.blurb, image: item.image }
                });
            }
            )
    }

    render() {
        return (
            <div className="catelogue-container" key={this.state.item.blurb}>
                <Catelogue item={this.state.item} />
            </div>
        );
    }
}

export default ItemDetails;