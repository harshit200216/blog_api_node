const Post = require('../Models/Post');

//create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, imageName, addedDate, category, user } = req.body;

    const newPost = new Post({
      title,
      content,
      imageName,
      addedDate: Date.now(),
      category,
      user,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      post: savedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//get a specific post by postId
const getPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// get all posts
const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//get posts by userId
const getPostByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await Post.find({ user: userId });

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// get posts by categoryId
const getPostByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const posts = await Post.find({ category: categoryId });

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// search posts by title
const searchPostByTitle = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const regex = new RegExp(keyword, 'i');

    const posts = await Post.find({ title: regex });

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// update a post by postId
const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const updateData = req.body;

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found or no changes made.',
      });
    }

    res.json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// delete a post by postId
const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const deletedPost = await Post.findByIdAndRemove(postId);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found or already deleted.',
      });
    }

    res.json({
      success: true,
      post: deletedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPost,
  getAllPost,
  getPostByUserId,
  getPostByCategoryId,
  searchPostByTitle,
  updatePost,
  deletePost,
};
