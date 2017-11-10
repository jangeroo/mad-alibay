import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backend from './backend/mock-backend.js';


class Buy extends Component {

    constructor(){
        super();
        this.state = {searchItem: "", queryMatchedItems: []}
    }

    componentDidMount(){
        console.log(backend.allListings());
    }

    _handleSearch = (event) => {
        event.preventDefault();

        const searchItemIDs = backend.searchForListings(this.state.searchItem); //search Item's ID
        const searchItems = searchItemIDs.map(ID=>({...{productID: ID},...backend.getItemDescription(ID)}));//get item's price and blurb through ID
        console.log(searchItems);
       this.setState({queryMatchedItems: searchItems});
    }

    _handleSearchBarOnChange = (event) =>{
        this.setState({searchItem: event.target.value});
    }
    render() {
        return (
            <div className='search-content'>
                <form onSubmit={this._handleSearch}>
                    <div className="searchBar">
                        <input onChange={this._handleSearchBarOnChange} placeholder="What are you looking for?" />
                        <button />
                    </div>
                </form>
                {this.state.queryMatchedItems.map(
                    item=>{

                        return (<div className='matchedItem' key={item.blurb}>
                            <div className='matchedItemBlurb'><Link to={`/product/productID=${item.productID}`}>{item.blurb}</Link></div>
                            <div className='matchedItemPrice'>{item.price}</div>
                        </div>);

                    }
                )}
            </div>
        )
    }

}

export default Buy;