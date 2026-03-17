const Content = require('../models/Content');

const getContent = async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = await Content.create({});
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContent = async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = await Content.create(req.body);
    } else {
      Object.assign(content, req.body);
      await content.save();
    }
    res.json({ message: 'Content updated successfully', content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getContent, updateContent };
