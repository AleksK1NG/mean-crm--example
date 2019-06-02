module.exports.login = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


module.exports.register = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};