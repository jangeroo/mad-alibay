import React, { Component } from 'react';
import firebase from 'firebase';

class Authenticate extends Component {

    _handleLogin = async event => {
        var provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider).then(user => {
           this.props.setUserID({ userID: user.additionalUserInfo.profile.id, username:user.additionalUserInfo.profile.name });
           
        })
        if (this.props.userID)  this.props.routeProps.history.push('/myAccount');
    }

    render() {
    
        return (
            <div className="authenticationContainer authenticationForm">
                <button className='btn' onClick={this._handleLogin}>SIGN IN WITH GOOGLE</button>
            </div>);
    }

}

export default Authenticate;