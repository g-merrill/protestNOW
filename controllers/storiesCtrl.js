const express = require('express');
const router = express.Router();
const db = require('../models');

// index
router.get('/', async (req, res) => {
  const stories = await db.Story.find({});
  return res.json(stories);
});

module.exports = router;
