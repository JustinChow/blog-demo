import React from 'react';
import AuthService from './services/authentication';
import { Redirect, Link } from 'react-router-dom';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: '',
            passwordValue: '',
            loginSuccessful: false,
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ usernameValue: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ passwordValue: event.target.value });
    }

    handleSubmit(event) {
        AuthService.login(this.state.usernameValue, this.state.passwordValue)
            .then(response => {
                if (typeof response !== 'undefined') {
                    this.setState({loginSuccessful: true});

                    // Needed to update the user state for App component. Would
                    // be good to start using Redux if the login/authentication
                    // system were to be refactored.
                    window.location.reload(false); 
                }
            });
        event.preventDefault();
    }

    render() {
        if (!this.state.loginSuccessful) {
            return (
                <div>
                    <Link to='/'>Go Home</Link>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Username:
                        <input type="text" value={this.state.usernameValue} onChange={this.handleUsernameChange} />
                        </label>
                        <label>
                            Password:
                        <input type="password" value={this.state.passwordValue} onChange={this.handlePasswordChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                
            );    
        }
        else {
            return(<Redirect to='/' />);
        }
        
    }
}