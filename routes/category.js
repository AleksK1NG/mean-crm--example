const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.delete('/:id', CategoryController.deleteCategory);
router.patch('/:id', CategoryController.updateCategory);
router.post('/', CategoryController.createCategory);

module.exports = router;
