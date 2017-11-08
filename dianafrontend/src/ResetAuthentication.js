import React, { Component } from 'react';
import {TOKEN} from './App.js';

class ResetAuthentication extends Component {

    _handleClick = () =>{
        localStorage.setItem(TOKEN,false);
    }

    render() {
        return (
            <div>
                <button onClick={this._handleClick}>SIGN OUT</button>
            </div>
        );
    }

}

export default ResetAuthentication;

