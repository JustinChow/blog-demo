import React from 'react';
import ReactDOM from 'react-dom';
import { Posts } from './posts/Posts';
import { PostView } from './post/index';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path='/posts/:postId' component={PostView} />

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
