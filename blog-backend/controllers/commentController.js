const User = require('../models/user');
const Post = require('../models/post');
const async = require('async');

const { body, validationResult } = require('express-validator');

// Handle GET on comments
exports.comments_get = function(req, res) {
    res.send('Getting comments from post ' + req.postId);
};

// Handle on GET on post Id
exports.commentId_get = function(req, res) {
    res.send('Getting comment ' + req.params.commentId + ' on post ' + req.postId);
};