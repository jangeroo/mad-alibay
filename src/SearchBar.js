import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backend from './backend/firebase-backend.js';


class SearchBar extends Component {

    constructor() {
        super();
        this.state = { searchItem: "" }
    }

    _handleSearch = (event) => {
        event.preventDefault();

        backend.searchForListings(this.input.value)        //GET Listing item IDs in an array matching search term
            .then(listings => {
                let arrItemObjs=[]
                listings.forEach(ID=>{
                    backend.getItemDescription(ID)
                    .then(item=>{
                        const itemObj = {productID:ID, blurb: item.blurb, image: item.image, price: item.price}
                        arrItemObjs=arrItemObjs.concat(itemObj);
                        this.props.onResult(arrItemObjs);

                    })
                })
            })



    }

    render() {
        return (
            <div className='search-content'>
                <form onSubmit={this._handleSearch}>
                    <div className="searchBar">
                        <input ref={r=>this.input=r} placeholder="What are you looking for?"/>
                        <button className="hidden"/>
                        <Link to='/search'><div/></Link>
                    </div>
                </form>

            </div>
        )
    }

}

export default SearchBar;