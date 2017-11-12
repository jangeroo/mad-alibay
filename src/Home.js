import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {
    return (
      <div className="home-content">
        <h1>It starts with a click.</h1>
        <div>
          <Link className="btn" to="/browse">Browse</Link>
          <Link className="btn" to="/sell">Sell</Link>
        </div>
      </div>
    );
  }

}

export default Home;
