const User = require('../Models/User');

const createUser = async (req, res) => {
  try {
    const { name, email, password, about } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      about,
    });

    const savedUser = await newUser.save();

    res.status(201).json({//201 for creation
      success: true,
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
  
      res.json({
        success: true,
        users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, 
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found or no changes made.',
      });
    }

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controller function to delete a specific user by ID
const deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId; // Get the user ID from the URL parameter
  
      // Delete the user document from the database using the User model and findByIdAndRemove()
      const deletedUser = await User.findByIdAndRemove(userId);
  
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found or already deleted.',
        });
      }
  
      res.json({
        success: true,
        user: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
  
  module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
  };