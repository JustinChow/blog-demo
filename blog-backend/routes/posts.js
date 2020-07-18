const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/postController');
const commentsRouter = require('./comments');

// Post routes
router.get('/', postsController.posts_get);
router.post('/', passport.authenticate('jwt', {session: false}),
   postsController.posts_post);
router.get('/:postId', postsController.postId_get);

router.use('/:postId/comments', function(req, res, next) { 
   req.postId = req.params.postId;
   next();
}, commentsRouter);


module.exports = router;