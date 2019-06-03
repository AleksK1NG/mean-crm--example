const Position = require('../models/Position');
const errorHandler = require('../utils/errorsHandler');

module.exports.getPositionById = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const positions = await Position.find({
      category: id,
      user: user._id
    });

    res.json(positions);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.createPosition = async (req, res) => {
  const { name, cost, category } = req.body;
  const user = req.user;
  try {
    const position = new Position({
      name,
      cost,
      category,
      user: user._id
    });

    await position.save();

    res.status(201).json(position);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.deletePosition = async (req, res) => {
  const { id } = req.params;

  try {
    await Position.remove({ _id: id });
    res.json({ message: 'Position has been deleted' });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.updatePosition = async (req, res) => {
  const { id } = req.params;

  try {
    const position = await Position.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });

    res.json(position);
  } catch (error) {
    errorHandler(res, error);
  }
};
