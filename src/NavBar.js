import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    _handleClick = () =>{
        this.props.updateUser({userID: null});
    }

    render() {
        if(!this.props.userID) {
            return (
                <div className="navBar">
                    <Link className="navBarLinks" to='/login'>Login</Link>
                  </div>
            );
        }
        return(
            <div className="navBar">
                <Link className="navBarLinks" to='/' onClick={this._handleClick}>Sign Out</Link>
            </div>

        )

    }

}

export default NavBar;