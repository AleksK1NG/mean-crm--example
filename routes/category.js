const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const UploadMiddleware = require('../middlewares/upload');

router.get('/', AuthMiddleware.onlyAuthUser, CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.delete('/:id', AuthMiddleware.onlyAuthUser, CategoryController.deleteCategory);
router.patch('/:id', AuthMiddleware.onlyAuthUser, UploadMiddleware.single('image'), CategoryController.updateCategory);
router.post('/', AuthMiddleware.onlyAuthUser, UploadMiddleware.single('image'), CategoryController.createCategory);

module.exports = router;
