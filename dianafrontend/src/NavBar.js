import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

    render() {
        if(this.props.isAuthenticated===false) {
            return (
                <div>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'> Register</Link>
                  </div>
            );
        }
        return(
            <div>AUTHENTICATED</div>
        )

    }

}

export default NavBar;