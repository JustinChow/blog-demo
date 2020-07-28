import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import React from 'react';
import { Posts } from './posts/Posts';
import { PostView } from './post/index';
import { LoginForm } from './loginForm';
import authService from './services/authentication';
import { SignupForm } from './signupForm';
import './app.css';

export class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user: authService.getCurrentUser()
        }

    }
    
    render() {
        function handleLogout() {
            authService.logout();
        };
        return(
            <Router>
                <ul>
                    <li>{!this.state.user && <Link to='/login'>Login</Link>}</li>
                    <li>{!this.state.user && <Link to='/Signup'>Sign Up</Link>}</li>
                </ul>
                
                {this.state.user && <p>Welcome, {this.state.user.username}</p>}
                {this.state.user && <a href='/' onClick={handleLogout}>Logout</a>}

                <Switch>
                    <Route path='/Signup'>
                        {this.state.user ? <Redirect to="/" /> : <SignupForm/>}
                    </Route>
                    <Route path='/login'>
                        {this.state.user ? <Redirect to="/" /> : <LoginForm/>}
                    </Route>
                    <Route path='/posts/:postId' render={(props) => <PostView {...props} user={this.state.user}/>} />

                    <Route path='/'>
                        <h1>Homepage</h1>
                        <div>
                            <Posts/>
                        </div>
                    </Route>
                </Switch>
            </Router>
        );
    }
}