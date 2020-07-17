var express = require('express');
var router = express.Router();

var postsController = require('../controllers/postController');
var commentsRouter = require('./comments');

// Post routes
router.get('/', postsController.posts_get);
router.get('/:postId', postsController.postId_get);

router.use('/:postId/comments', function(req, res, next) { 
   req.postId = req.params.postId;
   next();
}, commentsRouter);


module.exports = router;