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
        this.input.value="";


        backend.searchForListings(this.state.searchItem)        //GET Listing item IDs in an array matching search term
            .then(listings => {
                console.log(listings,"1")
                let arrItemObjs=[]
                listings.forEach(ID=>{
                    console.log(ID,"2")
                    backend.getItemDescription(ID)
                    .then(item=>{
                        console.log(item,"3")
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
                        <input ref={r=>this.input=r} onChange={this._handleSearchBarOnChange} placeholder="What are you looking for?"/>
                        <Link to='/search'><div/></Link>
                    </div>
                </form>
                
            </div>
        )
    }

}

export default SearchBar;