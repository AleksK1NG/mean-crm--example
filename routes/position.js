const express = require('express');
const router = express.Router();
const PositionController = require('../controllers/positionController');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.get('/:id', AuthMiddleware.onlyAuthUser, PositionController.getPositionById);
router.post('/', AuthMiddleware.onlyAuthUser, PositionController.createPosition);
router.delete('/:id', AuthMiddleware.onlyAuthUser, PositionController.deletePosition);
router.patch('/:id', AuthMiddleware.onlyAuthUser, PositionController.updatePosition);

module.exports = router;
