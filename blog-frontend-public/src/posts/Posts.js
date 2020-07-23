import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class Posts extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        fetch('api/posts')
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({posts: data});
                // this.setState({posts: posts});
                // console.log("state", this.state.posts);
            })
    }
    
    render() {
        return (
            <div className='posts-container'>
                {this.state.posts.map(post => (
                    <div key={post._id} className='post'>
                    <h1><Link to={'/posts/' + post._id}>{post.title}</Link></h1>
                        <p>{post.author.username}</p>
                        <p>{moment(post.publishDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        <p>{post.content.slice(0,300) + "..."}</p>
                    </div>
                ))}
            </div>
        );
    }
}
