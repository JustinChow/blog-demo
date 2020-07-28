import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import authService from './services/authentication';
import { LoginForm } from './loginForm';
import { CreatePost } from './CreatePost';

class App extends React.Component {
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
                {!this.state.user &&
                <ul>
                    <li>{<Link to='/admin/login'>Login</Link>}</li>
                </ul>}
                
                {this.state.user && <p>Welcome, {this.state.user.username} (Admin Account)</p>}
                {this.state.user && <a href='/' onClick={handleLogout}>Logout</a>}

                <Switch>
                    <Route path='/admin/login'>
                        {this.state.user ? <Redirect to="/admin" /> : <LoginForm/>}
                    </Route>
                    <Route path='/admin'>
                    {!this.state.user ? <Redirect to="/admin/login" /> : <CreatePost user={this.state.user}/>}
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;