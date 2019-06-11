const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/analyticsController');
const AuthMiddleware = require('../middlewares/authMiddleware');


router.get('/overview', AuthMiddleware.onlyAuthUser, AnalyticsController.overview)
router.get('/analytics', AuthMiddleware.onlyAuthUser, AnalyticsController.analytics)




module.exports = router;