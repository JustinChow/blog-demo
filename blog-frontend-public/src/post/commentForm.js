import React from 'react';
import './commentForm.css';
import AuthService from '../services/authentication';

export class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentValue: '',
        };

        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCommentChange(event) {
        this.setState({ commentValue: event.target.value });
    }

    handleSubmit(event) {
        fetch('/api/posts/' + this.props.postId + '/comments', {
            headers: {
                'Content-Type': 'application/json',
                ...AuthService.authHeader()
            },
            method: 'POST',
            body: JSON.stringify({
                content: this.state.commentValue,
            })
        })
        .then(data => window.location.reload(false));

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Comment:
                </label>
                <textarea rows='10' value={this.state.commentValue} onChange={this.handleCommentChange} />
                <input type="submit" value="Submit" />
            </form>
        );    
    }

}