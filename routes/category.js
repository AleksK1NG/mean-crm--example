const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.get('/', AuthMiddleware.onlyAuthUser, CategoryController.getAllCategories);
router.get('/:id',  CategoryController.getCategoryById);
router.delete('/:id', AuthMiddleware.onlyAuthUser, CategoryController.deleteCategory);
router.patch('/:id', AuthMiddleware.onlyAuthUser,CategoryController.updateCategory);
router.post('/',AuthMiddleware.onlyAuthUser, CategoryController.createCategory);

module.exports = router;
