const Category = require('../Models/Category');

//create a new category
const createCategory = async (req, res) => {
  try {
    const { categoryTitle, categoryDescription } = req.body;

    const newCategory = new Category({
      categoryTitle,
      categoryDescription,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      category: savedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//get a specific category by categoryId
const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// update a category by categoryId
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updateData = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found or no changes made.',
      });
    }

    res.json({
      success: true,
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//delete a category by categoryId
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found or already deleted.',
      });
    }

    res.json({
      success: true,
      category: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
