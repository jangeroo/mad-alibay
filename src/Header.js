import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {

    render() {
        return (
            <div className="App-header">
                <h1 className="App-title"><Link className='linkStyle' to='/'>Alibay</Link></h1>
            </div>
        );
    }

}

export default Header;