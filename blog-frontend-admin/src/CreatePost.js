import React from 'react';
import AuthService from './services/authentication';
import { Link, Redirect } from 'react-router-dom';
import './CreatePost.css';

export class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleValue: '',
            contentValue: '',
            isPublishedValue: false,
            postSuccessful: false,
            postId: undefined,
            errors: undefined
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleIsPublishedChange = this.handleIsPublishedChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ titleValue: event.target.value });
    }

    handleContentChange(event) {
        this.setState({ contentValue: event.target.value });
    }

    handleIsPublishedChange(event) {
        this.setState({ isPublishedValue: event.target.checked });
    }

    handleSubmit(event) {
        fetch('/api/posts/', {
            headers: {
                'Content-Type': 'application/json',
                ...AuthService.authHeader()
            },
            method: 'POST',
            body: JSON.stringify({
                title: this.state.titleValue,
                content: this.state.contentValue,
                isPublished: this.state.isPublishedValue
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                this.setState({errors: data.errors});
            }
            else {
                this.setState({
                    postSuccessful: true,
                    postId: data._id
                })
            }
        });

        event.preventDefault();
    }

    render() {
        var errors = []
        if (this.state.errors) {
            for (let i = 0; i < this.state.errors.length; i++) {
                errors.push(<li key={i}>{this.state.errors[i].msg}</li>)
            }
        }

        if (this.state.postSuccessful && this.state.isPublishedValue) {
            return(<Redirect to={'/posts/' + this.state.postId}/>);
        }
        else if (this.state.postSuccessful && !this.state.isPublishedValue) {
            return(<Redirect to='/'/>);
        }
        else {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Title:
                        </label>
                            <input id='title' type="text" value={this.state.titleValue} onChange={this.handleTitleChange} />
                        <label>
                            Content:
                        </label>
                        <textarea rows='10' value={this.state.contentValue} onChange={this.handleContentChange} />
                        <label>
                            Publish?
                        </label>
                        <input
                            name="isPublished"
                            type="checkbox"
                            checked={this.state.isPublishedValue}
                            onChange={this.handleIsPublishedChange} />
                        <input type="submit" value="Create New Post" />
                    </form>
    
                    { this.state.errors && 
                        <ul>
                            {errors}
                        </ul>
                    }
                </div>
            );    
        }
        
    }
}
