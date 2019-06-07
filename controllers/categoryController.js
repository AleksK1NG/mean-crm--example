const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorsHandler');

module.exports.getAllCategories = async (req, res) => {
  const user = req.user;

  try {
    const categories = await Category.find({ user: user._id });

    res.json(categories);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);

    res.json(category);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.remove({ _id: id });
    await Position.remove({ category: id });

    res.json({ message: 'Category deleted' });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.createCategory = async (req, res) => {
  const user = req.user;
  const { name, imageUrl } = req.body;
  try {
    const category = new Category({
      user: user._id,
      name,
      imageUrl
    });

    await category.save();

    res.status(201).json(category);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { name, imageUrl } = req.body;
  const updated = { name, imageUrl };
  if (req.file) {
    updated.imageUrl = req.file.path;
  }

  try {
    const category = await Category.findOneAndUpdate({ _id: id }, { $set: updated }, { new: true });

    res.json({ message: 'Success =D' });
  } catch (error) {
    errorHandler(res, error);
  }
};
