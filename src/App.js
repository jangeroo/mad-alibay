import React, { Component } from 'react';
import Header from './Header.js'
import Home from './Home.js';
import NavBar from './NavBar.js';
import Authenticate from './Authenticate.js';
import Footer from './Footer.js';
import SearchPage from './SearchPage.js';
import { BrowserRouter, Route } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import './App.css';
import TestDataGenerator from './TestDataGenerator.js'

const TOKEN = "authenticationtoken";

class App extends Component {

  constructor() {
    super();
    this.state = { isAuthenticated: localStorage.getItem(TOKEN) === "true", queryMatchedItems: [] }

  }



  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TestDataGenerator />

          {/* <NavBar> is updated according to whether or not the user is authenticated.
          If the user is logged in, the NavBar will have account navigation.
          If the user is not logged in, the NavBar will have a generic navigation
          props:  [isAuthenticated] boolean. Takes value of this.state.isAuthenticated.
                  [updatedIsAuthenticated(val)] function. Updates this.state.isAuthenticated depending on user's credentials
          */}
          <NavBar
            isAuthenticated={this.state.isAuthenticated}
            updateIsAuthenticated={
              (val) => {
                this.setState({ isAuthenticated: val })
                localStorage.setItem(TOKEN, val);
              }
            } />

          <SearchBar onResult={(result)=>this.setState({queryMatchedItems: result})}/>



          {/* <Header> contains the ALIBAY sign and link to HOMEPAGE */}
          <Header />



          {/* MID-CONTENT contains all the routed paths */}
          <div className="mid-content">



            {/* <Home> is updated according to whether or not the user is authenticated.
            If the user is logged in, the homepage will have account navigation.
            If the user is not logged in, the homepage will have a generic navigation
            props:  [isAuthenticated] boolean. Takes value of this.state.isAuthenticated.
                    [updatedIsAuthenticated(val)] function. Updates this.state.isAuthenticated depending on user's credentials
            */}
            <Route exact path="/" render={() =>
              <Home
                isAuthenticated={this.state.isAuthenticated}
                updateIsAuthenticated={
                  (val) => {
                    this.setState({ isAuthenticated: val })
                    localStorage.setItem(TOKEN, val);
                  }
                }
              />} />



            {/* <Buy> is the component/page in which the user can make searches for items (whether or not they are logged in) */}
            <Route path="/search" render={() => <SearchPage queryMatchedItems={this.state.queryMatchedItems}/>} />



            {/* <Authenticate> is the component/page that takes care of user's credentials
                The Login page asks for username and password
                The Register page asks to create username and password
            props:  [display] string. Screen to display either: LOGIN or REGISTER PAGE
                    [isAuthenticated] boolean. Takes value of this.state.isAuthenticated.
                    [updatedIsAuthenticated(val)] function. Updates this.state.isAuthenticated depending on user's credentials
            */}
            <Route path="/login" render={(routeProps) =>
              <Authenticate
                display='login'
                isAuthenticated={this.state.isAuthenticated}
                push={routeProps.history.push}
                updateIsAuthenticated={
                  (val) => {
                    this.setState({ isAuthenticated: val })
                    localStorage.setItem(TOKEN, val);
                  }
                } />} />
            <Route path="/register" render={(routeProps) =>
              <Authenticate
                display='register'
                isAuthenticated={this.state.isAuthenticated}
                push={routeProps.history.push}
                updateIsAuthenticated={
                  (val) => {
                    this.setState({ isAuthenticated: val })
                    localStorage.setItem(TOKEN, val);
                  }
                } />} />
          </div>


          {/* <Footer> contains FAQ, About, Contact, etc.*/}
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
