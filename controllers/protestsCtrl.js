const express = require('express');
const db = require('../models');

const router = express.Router();

// index (get all protests)
router.get('/', async (req, res) => {
  try {
    const protests = await db.Protest.find({});
    res.json(protests);
  } catch (err) {
    res.status(400).json(err);
  }
});

// getProtestByID (get one protest)
router.get('/:id', async (req, res) => {
  try {
    const protest = await db.Protest.findById(req.params.id).populate({
      path: 'stories',
      model: 'Story',
      populate: {
        path: 'creator',
        model: 'User'
      }
    });
    res.json(protest);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add protest
router.post('/create', async (req, res) => {
  const protest = new db.Protest(req.body);
  try {
    await protest.save();
    res.json(protest);
  } catch (err) {
    // Error saving to the database
    res.status(400).json(err);
  }
});

module.exports = router;
