import React from 'react';
import ReactDOM from 'react-dom';
import { Posts } from './posts/Posts';
import { Post } from './posts/Post';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path='/posts/:postId' component={Post} />

                <Route path='/'>
                    <div>
                        <Posts/>
                    </div>
                </Route>
            </Switch>
            
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
