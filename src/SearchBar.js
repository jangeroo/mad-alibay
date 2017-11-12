import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SearchBar extends Component {

    _handleSearch = (event) => {
        event.preventDefault();
        this.props.onResult(this.input.value)
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