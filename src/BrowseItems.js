import React, { Component } from 'react';
import Catelogue from './Catelogue.js';
import backend from './backend/firebase-backend.js';

class BrowseItems extends Component {

    constructor() {
        super();
        this.state = { itemsForSale: [] }
    }

    componentWillMount() {
        this._getItemsForSale();
    }

    _getItemsForSale = () => {
        backend.allListings().then(
            arrItemIDs => {
                let arrItemObjs=[];
                arrItemIDs.forEach(
                    itemID => {backend.getItemDescription(itemID)
                    .then(item=>
                        {
                            const itemObj = {itemID:itemID, blurb: item.blurb, image: item.image, price: item.price}
                            arrItemObjs=arrItemObjs.concat(itemObj);
                            this.setState({ itemsForSale: arrItemObjs });
                        }
                    )
                }
                )
            }
        )
    }


    render() {

        return (
            <div className="category-container">
                {this.state.itemsForSale.map(item => {
                    return (<div className="catelogue-container" key={item.blurb}><Catelogue item={item}/></div>)
                }
                )}
            </div>
        );
    }

}

export default BrowseItems;