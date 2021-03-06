import React from 'react';
import moment from 'moment';
import {
    Link,
  } from "react-router-dom";

export class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: undefined,
            comments: []
        }
    }

    componentDidMount() {
        var postId = this.props.match.params.postId;
        fetch('/api/posts/' + postId)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({ post: data });
            });
    }
    
    render() {
        if (this.state.post) {
            return (
                <div className='post-view'>
                    <Link to='/'>Go Home</Link>
                    <div className='post-container'>
                        <div key={this.state.post._id} className='post'>
                            <h2>{this.state.post.title}</h2>
                            <p>{this.state.post.author.username}</p>
                            <p>{moment(this.state.post.publishDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            <p>{this.state.post.content}</p>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        
    }
}
