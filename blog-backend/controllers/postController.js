const User = require('../models/user');
const Post = require('../models/post');
const async = require('async');
const mongoose = require('mongoose');
const moment = require('moment');
const passport = require('passport');
const authController = require('../controllers/authController');

const { body, validationResult } = require('express-validator');

// Handle GET on posts
exports.posts_get = function(req, res) {
    res.send('Getting posts');
};

// Handle on GET on post Id
exports.postId_get = function(req, res) {
    res.send('Getting post ' + req.params.postId);
};

// Handle POST on posts
exports.posts_post = [
    // Authenticate user
    passport.authenticate('jwt', {session: false}),

    // Only allow admins to post
    authController.isAdmin,

    // Validate fields
    body('title').trim().isLength({ min: 1 })
        .withMessage('Title must be specified.'),
    body('content').trim().isLength({ min: 1 })
        .withMessage('Post content must not be empty.'),
    body('isPublished')
        .exists()
        .withMessage('Must indicate whether post should be published')
        .isBoolean(),


    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json(errors);
        }
        else {
            // Create a Message object with escaped and trimmed data.
            var post = new Post({ 
                title: req.body.title,
                content: req.body.content,
                author: mongoose.Types.ObjectId(req.user.id),
                isPublished: req.body.isPublished,
            });
            if (req.body.isPublished == 'true') {
                post.publishDate = moment().format();
            }

            // Data is valid. Save Message.
            post.save((err, savedDoc) => {
                if (err) {
                    return next(err);
                };
                res.json(savedDoc);
            });
        }
    }
];