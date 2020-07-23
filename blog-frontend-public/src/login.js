import React from 'react';
import AuthService from './services/authentication';

export class LoginView extends React.Component {
    componentDidMount() {
        AuthService.login('justin', 'justin12')
            .then(response => console.log(response));
    }
    
    render() {
        return (
            <div className='post-view'>
                <p>Login View</p>
            </div>
        );
    }
}