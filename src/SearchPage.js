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

                        return (<div className='matchedItem' key={item.blurb}>
                            <div className='matchedItemBlurb'><Link to={`/product/productID=${item.productID}`}>{item.blurb}</Link></div>
                            <div className='matchedItemPrice'>{Number(item.price).toLocaleString('en')}</div>
                        </div>);

                    }
                )}
            </div>
        )
    }

}

export default SearchPage;