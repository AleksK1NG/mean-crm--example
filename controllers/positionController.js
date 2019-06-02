module.exports.getPositionById = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.createPosition = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.deletePosition = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.updatePosition = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
