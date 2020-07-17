var express = require('express');
var router = express.Router();

var commentsController = require('../controllers/commentController');

// Comment routes
router.get('/', commentsController.comments_get);
router.get('/:commentId', commentsController.commentId_get);

module.exports = router;
