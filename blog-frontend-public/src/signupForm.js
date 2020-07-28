import React from 'react';
import AuthService from './services/authentication';
import { Redirect, Link } from 'react-router-dom';

export class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: '',
            passwordValue: '',
            passwordConfirmValue: '',
            signupSuccessful: false,
            errors: undefined
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ usernameValue: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ passwordValue: event.target.value });
    }
    
    handlePasswordConfirmChange(event) {
        this.setState({ passwordConfirmValue: event.target.value });
    }

    handleSubmit(event) {
        fetch('/api/signup', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                username: this.state.usernameValue,
                password: this.state.passwordValue,
                passwordConfirm: this.state.passwordConfirmValue,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                this.setState({errors: data.errors});
            }
            else {
                this.setState({signupSuccessful: true});
            }
        });

        event.preventDefault();
    }

    render() {
        if (!this.state.signupSuccessful) {
            var errors = []
            if (this.state.errors) {
                for (let i = 0; i < this.state.errors.length; i++) {
                    errors.push(<li key={i}>{this.state.errors[i].msg}</li>)
                }
            }

            return (
                <div>
                    <Link to='/'>Go Home</Link>
                    <h1>Sign Up</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Username:
                        <input type="text" value={this.state.usernameValue} onChange={this.handleUsernameChange} />
                        </label>
                        <label>
                            Password:
                        <input type="password" value={this.state.passwordValue} onChange={this.handlePasswordChange} />
                        </label>
                        <label>
                            Confirm Password:
                        <input type="password" value={this.state.passwordConfirmValue} onChange={this.handlePasswordConfirmChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>

                    { this.state.errors && 
                        <ul>
                            {errors}
                        </ul>
                    }
                </div>
            );    
        }
        else {
            return(<Redirect to='/login' />);
        }
        
    }
}