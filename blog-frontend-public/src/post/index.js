import React from 'react';
import { Post } from './Post';
import { Comments } from './Comments';

export function PostView(props) {
    return (
        <div className='post-view'>
            <Post match={props.match} />
            <hr/>
            <h2>Comments</h2>
            <Comments match={props.match}/>
        </div>
    );
}