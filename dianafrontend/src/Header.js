import React, { Component } from 'react';
import NavBar from './NavBar.js';
import {Route} from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <div className="App-header">
                <h1 className="App-title">Alibay</h1>
            </div>
        );
    }

}

export default Header;