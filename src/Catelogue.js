import React, { Component } from 'react';

class Catelogue extends Component {


    render() {
        return (
            <div className="item-container">
                <div className="item-image">
                    <img src={this.props.item.image} alt=""/>
                </div>
                <div className="item-details">
                    <div className="item-blurb">{this.props.item.blurb}</div>
                    <div className="item-price">{this.props.item.price}</div>
                </div>
            </div>
        );
    }

}

export default Catelogue;