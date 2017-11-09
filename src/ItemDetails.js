import React, { Component } from 'react';
import { getItemDescription, allListings } from './main';

const items = [getItemDescription(allListings())];

// const listings = allListings();
// const itemDescription = getItemDescription(listings);
// const items = [itemDescription];

console.log(items);

class ItemDetails extends Component {
    
        constructor(props) {
            super(props);
    
            this.state = {
                items
            }
    
        }
    
        render() {
            return (
                <div className="container">
                    <hr/>
                    <h4> Total item count: <span className="badge">{this.state.items.length}</span></h4>
                    <ul className="list-group">
                            {this.state.items.map((item, index) =>
                            <li className="list-group-item" key={index}>
                            <h4 className="list-group-item-heading"> {item.blurb} </h4>
                            <p>$ {item.price} </p>
                            {/* <button className="btn btn-danger btn-sm" onClick={this.removeItem.bind(this, index)}><span className="glyphicon glyphicon-trash"></span> Delete</button> */}
                            </li>
                        )}
                    </ul>
                </div>
            );
        }
    }
    
    export default ItemDetails;