const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.get('/', AuthMiddleware.onlyAuthUser, CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.delete('/:id', CategoryController.deleteCategory);
router.patch('/:id', CategoryController.updateCategory);
router.post('/', CategoryController.createCategory);

module.exports = router;
