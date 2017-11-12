import React, { Component } from 'react';
import firebase from 'firebase'

class Authenticate extends Component {

    _handleLogin = event => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(user => {
            this.props.setUserID({ userID: user.additionalUserInfo.profile.id })
        })
    }

    render() {
        if (this.props.userID) return (<div>You are signed in.</div>)

        return (
            <div className="authenticationContainer authenticationForm">
                <button className='btn' onClick={this._handleLogin}>SIGN IN WITH GOOGLE</button>
            </div>);
    }

}

export default Authenticate;