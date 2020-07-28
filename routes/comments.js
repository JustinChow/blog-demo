var express = require('express');
var router = express.Router();

var commentsController = require('../controllers/commentController');
const { route } = require('./posts');

// Comment GET route
router.get('/', commentsController.comments_get);

// Comment POST route
router.post('/', commentsController.comments_post);

module.exports = router;
