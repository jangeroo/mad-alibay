import React, { Component } from 'react';


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
                        <button/>

                    </div>
                </form>

            </div>
        )
    }

}

export default SearchBar;