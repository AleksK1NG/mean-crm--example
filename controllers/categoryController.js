module.exports.getAllCategories = async (req, res) => {
  console.log('Category GET ALL USER => ', req.user);
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.getCategoryById = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.createCategory = async (req, res) => {
  try {
    res.json({ message: 'Success =D' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
