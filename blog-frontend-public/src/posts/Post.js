import React from 'react';
import moment from 'moment';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
  } from "react-router-dom";

export class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: undefined,
        }
    }

    componentWillMount() {
        var postId = this.props.match.params.postId;
        fetch('/api/posts/' + postId)
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                this.setState({post: data});
                // this.setState({posts: posts});
                // console.log("state", this.state.posts);
            })
    }
    
    render() {
        if (this.state.post) {
            return (
                <div className='post-container'>
                    <div key={this.state.post._id} className='post'>
                        <h1>{this.state.post.title}</h1>
                        <p>{this.state.post.author.username}</p>
                        <p>{moment(this.state.post.publishDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        <p>{this.state.post.content}</p>
                    </div>
                    <Link to='/'>Go Home</Link>
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
