const Comment = require('../models/comment');
const passport = require('passport');
const mongoose = require('mongoose');

const { body, validationResult } = require('express-validator');

// Handle GET on comments
exports.comments_get = function(req, res, next) {
    Comment.find({post: req.postId}, 'author content post createdAt')
        .populate('author', 'username')
        .populate('post', '_id')
        .exec(function (err, comments_list) {
            if (err) { 
                return next(err); 
            }

            res.json(comments_list);
        });
};

// Handle POST on comments
exports.comments_post = [
    // Authenticate user
    passport.authenticate('jwt', {session: false}),

    // Validate fields
    body('content').trim().isLength({ min: 1 })
        .withMessage('Comment content must not be empty.'),


    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json(errors);
        }
        else {
            // Create a Comment object with escaped and trimmed data.
            var comment = new Comment({ 
                content: req.body.content,
                author: mongoose.Types.ObjectId(req.user.id),
                post: mongoose.Types.ObjectId(req.postId),
            });

            // Data is valid. Save Message.
            comment.save((err, savedDoc) => {
                if (err) {
                    return next(err);
                };
                res.json(savedDoc);
            });
        }
    }
];