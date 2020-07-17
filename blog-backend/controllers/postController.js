const User = require('../models/user');
const Post = require('../models/post');
const async = require('async');

const { body, validationResult } = require('express-validator');

// Handle GET on posts
exports.posts_get = function(req, res) {
    res.send('Getting posts');
};

// Handle on GET on post Id
exports.postId_get = function(req, res) {
    res.send('Getting post ' + req.params.postId);
};