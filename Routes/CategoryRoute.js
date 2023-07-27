const express = require("express");

const router = express.Router();
const categoryController = require('../Controller/CategoryController');

//Create category
router.post('/',categoryController.createCategory);

//get specific category
router.get('/:categoryId',categoryController.getCategory);

//get all category
router.get('/',categoryController.getAllCategories);

//update category
router.put('/:categoryId',categoryController.updateCategory);

//delete category
router.delete('/:categoryId',categoryController.deleteCategory);

module.exports = router;

