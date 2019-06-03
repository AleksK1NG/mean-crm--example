const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports.register = async (req, res) => {
  const { email, password, name, info } = req.body;
  try {
    const candidate = await User.findOne({ email });
    if (candidate) return res.status(409).json({ message: 'User is already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword, name, info });

    await user.save();

    res.status(201).json(user.toJSON());
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
