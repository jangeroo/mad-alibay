import React, { Component } from 'react';
import Header from './Header.js'
import Home from './Home.js';
import NavBar from './NavBar.js';
import Authenticate from './Authenticate.js';
import Footer from './Footer.js';
import Buy from './Buy.js';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

const TOKEN = "authenticationtoken";

class App extends Component {

  constructor() {
    super();
    this.state = { isAuthenticated: localStorage.getItem(TOKEN) === "true" };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/*1. NavBar is updated according to whether the user is authenticated */}
          <NavBar isAuthenticated={this.state.isAuthenticated} />
          <Header />
          <div className="mid-content">
            <Route exact path="/" render={() => <Home />} />
            <Route path="/buy" render={() => <Buy />} />
            <Route path="/login" render={() => <Authenticate display='login' updateIsAuthenticated={
              (val) => {
                this.setState({ isAuthenticated: val })
                localStorage.setItem(TOKEN, val);
              }
            } />} />
            <Route path="/register" render={() => <Authenticate display='register' />} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
