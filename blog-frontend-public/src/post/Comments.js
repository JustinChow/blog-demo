import React from 'react';
import moment from 'moment';

export class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: undefined,
        }
    }

    componentWillMount() {
        var postId = this.props.match.params.postId;
        fetch('/api/posts/' + postId + '/comments')
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({ comments: data });
            });
    }
    
    render() {
        if (typeof this.state.comments === 'undefined') {
            return (
                <div className='comments-container'>
                    <p>Loading...</p>
                </div>
            );
        }
        else if (this.state.comments.length === 0) {
            return (
                <div className='comments-container'>
                    <p>No comments</p>
                </div>
            );
            
        }
        else {
            return (
                <div className='comments-container'>
                    {this.state.comments.map(comment => (
                        <div key={comment._id} className='comment'>
                            <p>{comment.author.username}</p>
                            <p>{moment(comment.createdAt).fromNow()}</p>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </div>
            );
        }
    }
}
