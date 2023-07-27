const express = require('express');
const router = express.Router();

const postController = require("../Controller/PostController")

//Create post
router.post('/',postController.createPost);

//get specific user
router.get('/:postId',postController.getPost);

//get all Post
router.get('/',postController.getAllPost);

//get post by userid
router.get('/user/:userId', postController.getPostByUserId);

//get post by category id
router.get('/category/:categoryId', postController.getPostByCategoryId);

//get post by title
router.get('/search/:keyword', postController.searchPostByTitle);

//update post
router.put('/:postId',postController.updatePost);

//delete post
router.delete('/:postId',postController.deletePost);

module.exports = router;