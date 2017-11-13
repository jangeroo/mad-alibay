import React, { Component } from 'react';
import TestDataGenerator from './TestDataGenerator.js'

class Header extends Component {

    render() {
        return (
            <div className="footer">
                <div className="footer-bottom">© 2017 Alibay. All rights reserved.</div>
                <div><TestDataGenerator /></div>
            </div>
        );
    }

}

export default Header;