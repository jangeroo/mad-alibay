import React, { Component } from 'react';

class Authenticate extends Component {

    constructor(props){
        super(props);
        this.state={username: "", password: ""}
    }

    _handleLogin = (event)=>{
        event.preventDefault();
        this.props.updateIsAuthenticated(true);

        if(this.props.isAuthenticated){
            this.props.push("/");
        }
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

        if (this.props.display === 'login') {
            return(<div className="authenticationContainer">
                <form onSubmit={this._handleLogin} className="authenticationForm">
                <input onChange={this._handleOnChangeUsername} placeholder="Username"/>
                <input onChange={this._handleOnChangePassword} type="password" placeholder="Password"/>
                <button className="btn">SIGN IN</button>
                </form>
            </div>);
        }
        else if (this.props.display === 'register') {
            return(<div className="authenticationContainer">
                <form onSubmit={this._handleLogin} className="authenticationForm">
                <input onChange={this._handleOnChangeUsername} placeholder="Create Username"/>
                <input onChange={this._handleOnChangePassword} type="password" placeholder="Create Password"/>
                <input onChange={this._handleOnChangePassword} type="password" placeholder="Re-Enter Password"/>
                <button className="btn">SIGN UP</button>
                </form></div>);
        }

    }

}

export default Authenticate;