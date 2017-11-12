import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backend from './backend/firebase-backend.js';


class SearchPage extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className='search-content'>
                {this.props.queryMatchedItems.map(
                    item => {

                        return (
                            <div className='matchedItem' key={item.blurb}>
                                <div className='item-image'><Link to={`/product/productID=${item.productID}`}><img src={item.image}/></Link></div>
                                <div className='item-details'>
                                    <div className='matchedItemBlurb'><Link to={`/product/productID=${item.productID}`}>{item.blurb}</Link></div>
                                    <div className='item-price'>{Number(item.price).toLocaleString('en')}</div>
                                </div>
                            </div>);

                    }
                )}
            </div>
        )
    }

}

export default SearchPage;