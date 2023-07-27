const Comment = require('../Models/Comment');
const Post = require("../Models/Post")

//create a new comment
const createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found.',
      });
    }

    const newComment = new Comment({
      content,
      post: postId,
    });

    const savedComment = await newComment.save();

    res.status(201).json({
      success: true,
      comment: savedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//get a specific comment by commentId
const getComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        error: `Comment not found with id: ${commentId}`,
      });
    }
    res.json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//get all comments on a post
const getAllComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId });

    if (comments.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No comments found for the specified post.',
      });
    }

    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//  update a comment
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const updateData = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found or no changes made.',
      });
    }

    res.json({
      success: true,
      comment: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//delete a comment
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const deletedComment = await Comment.findByIdAndRemove(commentId);

    if (!deletedComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found or already deleted.',
      });
    }

    res.json({
      success: true,
      comment: deletedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createComment,
  getComment,
  getAllComment,
  updateComment,
  deleteComment,
};
