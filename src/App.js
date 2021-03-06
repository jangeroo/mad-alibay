import React, { Component } from 'react';
import Header from './Header.js'
import Home from './Home.js';
import NavBar from './NavBar.js';
import Authenticate from './Authenticate.js';
import Footer from './Footer.js';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import BrowseItems from './BrowseItems.js';
import ItemDetails from './ItemDetails.js';
import Sell from './Sell.js';
import PurchaseHistory from './PurchaseHistory.js';
import SellHistory from './SellHistory.js';
import UserAccountHome from './UserAccountHome.js';


class App extends Component {

  constructor() {
    super();
    this.state = {
      userID: null,
      username: null
    }
  }

  updateState = update => {
    // console.log('updating App state with', update);
    this.setState(update)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">

          {/* <NavBar> is updated according to whether or not the user is authenticated.
          If the user is logged in, the NavBar will have account navigation.
          If the user is not logged in, the NavBar will have a generic navigation
          props:  [isAuthenticated] boolean. Takes value of this.state.isAuthenticated.
                  [updatedIsAuthenticated(val)] function. Updates this.state.isAuthenticated depending on user's credentials
          */}
          <NavBar
            userID={this.state.userID}
            updateUser={this.updateState}
          />




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
            <Route exact path="/" render={() => <Home />} />


            {/* <Authenticate> is the component/page that takes care of user's credentials
                The Login page asks for username and password
                The Register page asks to create username and password
            props:  [display] string. Screen to display either: LOGIN or REGISTER PAGE
                    [isAuthenticated] boolean. Takes value of this.state.isAuthenticated.
                    [updatedIsAuthenticated(val)] function. Updates this.state.isAuthenticated depending on user's credentials
            */}
            <Route path="/login" render={(routeProps) =>
              <Authenticate
                setUserID={this.updateState}
                userID={this.state.userID}
                username={this.state.username}
                routeProps={routeProps}
              />
            } />

            <Route exact path="/sell" render={(routeProps) => <Sell userID={this.state.userID} routeProps={routeProps}/>} />
            <Route exact path="/browse" render={() => <BrowseItems userID={this.state.userID} />} />


            <Route exact path="/browse/:productID" render={(routeProps) => {
              return <ItemDetails productID={routeProps.match.params.productID} userID={this.state.userID} />
            }} />

            <Route exact path="/purchaseHistory" render={() => <PurchaseHistory userID={this.state.userID} />} />
            <Route exact path="/sellHistory" render={() => <SellHistory userID={this.state.userID} />} />

            <Route exact path="/myAccount" render={() => <UserAccountHome username={this.state.username} />} />

          </div>


          {/* <Footer> contains FAQ, About, Contact, etc.*/}
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
