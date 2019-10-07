const express = require('express');
const router = express.Router();
const db = require('../models');

// index of all user's stories
router.get('/', async (req, res) => {
  const stories = await db.Story.find({ createdBy: req.user.username });
  return res.json(stories);
});

module.exports = router;
