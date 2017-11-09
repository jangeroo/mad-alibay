import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  _handleBuyClick = () => {

  }

  render() {
    return (
      <div className="home-content">
        <h1>It starts with a click.</h1>
        <div>
          <Link className="btn" onClick={this._handleBuyClick} to="/buy">Buy</Link>
          <Link className="btn" onClick={this._handleSellClick} to="/sell">Sell</Link>
        </div>
      </div>
    );
  }

}

export default Home;
