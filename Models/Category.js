const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryTitle: {
    type: String,
    required: true,
    maxlength: 100,
  },
  categoryDescription: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
