import React from 'react';
import ReactDOM from 'react-dom';
import { Posts } from './posts/PostsDisplay';

ReactDOM.render(
    <React.StrictMode>
        <div>
            <Posts/>
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);
