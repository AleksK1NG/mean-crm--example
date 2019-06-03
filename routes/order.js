const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.get('/', AuthMiddleware.onlyAuthUser, OrderController.getAllOrders);
router.post('/', AuthMiddleware.onlyAuthUser, OrderController.createOrder);

module.exports = router;
