import React, { Component } from 'react';
import CreateItem from './CreateItem.js';


class Sell extends Component {

    componentWillMount(){
        if (!this.props.userID) {
            this.props.routeProps.history.push('/login');
        }
    }
    render() {

        return (<div><CreateItem userID={this.props.userID}/></div>)
    }

}

export default Sell;