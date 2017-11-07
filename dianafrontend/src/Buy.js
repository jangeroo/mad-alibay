import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Buy extends Component {
    _handleSubmit = () => {

    }
    render() {
        return (
            <div className='search-content'>
                <form onSubmit={this._handleSubmit}>
                    <div className="searchBar">
                        <input placeholder="What are you looking for?" />
                        <button />
                    </div>
                </form>
                {[...Array(15)].map((_, i) => (
                    <div key={`helloDiv_${i}`} className="buy-item">
                        hello
                    </div>
                ))}
            </div>
        )
    }

}

export default Buy;