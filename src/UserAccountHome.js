import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserAccountHome extends Component {

    render() {
        return (
            <div className="authenticationContainer authenticationForm">
                <div> Hi {this.props.username}, you are now signed in.</div>
                <Link className='btn' to='/sell' onClick={this._handleLogin}>Create Item Listing</Link>
                <Link className='btn' to='/sellHistory' onClick={this._handleLogin}>Items Sold</Link>
                <Link className='btn' to='/purchaseHistory' onClick={this._handleLogin}>Purchase History</Link> 
            </div>);
    }

}

export default UserAccountHome;