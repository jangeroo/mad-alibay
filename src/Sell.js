import React, { Component } from 'react';
import Authenticate from './Authenticate.js'
import CreateItem from './CreateItem.js';


class Sell extends Component {

    render() {
        if (!this.props.appState.userID) {
            return (
                <Authenticate
                    setUserID={this.props.updateState}
                    userID={this.props.appState.userID}
                />
            )
        }
        return (<div><CreateItem sellerID={this.props.appState.userID}/></div>)
    }

}

export default Sell;