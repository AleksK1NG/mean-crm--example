const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No user with given email' });

    const passwordResult = await bcrypt.compare(password, user.password);
    if (!passwordResult) res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id
      },
      config.get('JWT_SECRET'),
      { expiresIn: '1h' }
    );

    res.json({ user, token });
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

    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports.loadCurrentUser = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.sendStatus(422).json({ message: 'Not auth user' });
  }

  res.status(200).json(user);
};
