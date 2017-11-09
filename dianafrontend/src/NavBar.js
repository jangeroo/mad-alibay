import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    _handleClick = () =>{
        this.props.updateIsAuthenticated(false);
    }

    render() {
        if(this.props.isAuthenticated===false) {
            return (
                <div className="navBar">
                    <Link className="navBarLinks" to='/login'>Login</Link>
                    <Link className="navBarLinks" to='/register'> Register</Link>
                  </div>
            );
        }
        return(
            <div className="navBar"><Link className="navBarLinks" to='/' onClick={this._handleClick}>Sign Out</Link>
            </div>
            
        )

    }

}

export default NavBar;