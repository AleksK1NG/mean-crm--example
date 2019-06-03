const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.get('/me', AuthMiddleware.onlyAuthUser, AuthController.loadCurrentUser);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

module.exports = router;
