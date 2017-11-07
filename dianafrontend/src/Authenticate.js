import React, { Component } from 'react';

class Authenticate extends Component {

    constructor(props){
        super(props);
        this.state={username: "", password: ""}
    }

    _handleLogin = (event)=>{
        event.preventDefault();
        this.props.updateIsAuthenticated(true);
    }

    _handleOnChangeUsername = (event) =>{
        this.setState({username: event.target.value});
    }

    _handleOnChangePassword = (event) =>{
        this.setState({password: event.target.value});
    }
    // _handleOnChange = (event, key) =>{
    //     this.setState({[key]: event.target.value});
    // }

    render() {

        switch(this.props.display){
            case 'login':
            return(<div>
                <form onSubmit={this._handleLogin}>
                Username:
                <input onChange={this._handleOnChangeUsername} placeholder="Username"/>
                Password:
                <input onChange={this._handleOnChangePassword} placeholder="Password"/>
                <button>Go!</button>
                </form>
            </div>);
            case 'register':
            return(<div>register</div>);
        }

    }

}

export default Authenticate;