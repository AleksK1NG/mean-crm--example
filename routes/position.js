const express = require('express');
const router = express.Router();
const PositionController = require('../controllers/positionController');

router.get('/:id', PositionController.getPositionById);
router.post('/', PositionController.createPosition);
router.delete('/:id', PositionController.deletePosition);
router.patch('/:id', PositionController.updatePosition);

module.exports = router;
