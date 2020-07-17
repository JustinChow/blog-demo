var express = require('express');
var router = express.Router();

var postsRouter = require('./posts');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.use('/posts', postsRouter);

module.exports = router;
