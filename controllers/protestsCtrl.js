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
