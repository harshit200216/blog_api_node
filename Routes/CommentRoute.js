const express = require("express");

const router = express.Router();
const commentController = require('../Controller/CommentController');

//Create comment
router.post('/',commentController.createComment);

//get specific comment
router.get('/:commentId',commentController.getComment);

//get all comment on post
router.get('/post/:postId',commentController.getAllComment);


//update comment
router.put('/:commentId',commentController.updateComment);

//delete user
router.delete('/:commentId',commentController.deleteComment);

module.exports = router;

