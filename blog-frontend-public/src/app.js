import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import React from 'react';
import { Posts } from './posts/Posts';
import { PostView } from './post/index';
import { LoginView } from './login';
import authService from './services/authentication';

export class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user: authService.getCurrentUser()
        }

    }

    componentDidMount() {

    }
    
    render() {
        function handleLogout() {
            authService.logout();
        };
        return(
            <Router>
                {!this.state.user && <Link to='/login'>Login</Link>}
                {this.state.user && <a href='/' onClick={handleLogout}>Logout</a>}
                <Switch>
                    <Route path='/login'>
                        <LoginView/>
                    </Route>
                    <Route path='/posts/:postId' component={PostView} />

                    <Route path='/'>
                        <div>
                            <Posts/>
                        </div>
                    </Route>
                </Switch>
            </Router>
        );
    }
}