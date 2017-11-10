import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backend from './backend/firebase-backend.js';


class SearchBar extends Component {

    constructor() {
        super();
        this.state = { searchItem: "" }
    }

    componentDidMount() {
        console.log(backend.allListings());
    }

    _handleSearch = (event) => {
        event.preventDefault();


        backend.searchForListings(this.state.searchItem)        //GET Listing item IDs in an array matching search term
            .then(listings => {
                let arrItemObjs=[]
                listings.forEach(ID=>{
                    backend.getItemDescription(ID)
                    .then(item=>{
                        const itemObj = {productID:ID, blurb: item.blurb, price: item.price}
                        arrItemObjs=arrItemObjs.concat(itemObj);
                        this.props.onResult(arrItemObjs);
                    })
                })
            })

    }

    _handleSearchBarOnChange = (event) => {
        this.setState({ searchItem: event.target.value });
    }
    render() {
        return (
            <div className='search-content'>
                <form onSubmit={this._handleSearch}>
                    <div className="searchBar">
                        <input value={this.state.searchItem} onChange={this._handleSearchBarOnChange} placeholder="What are you looking for?" />
                        <Link to='/search'><div/></Link>
                    </div>
                </form>
                
            </div>
        )
    }

}

export default SearchBar;