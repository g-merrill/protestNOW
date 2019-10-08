const express = require('express');
const router = express.Router();
const db = require('../models');

// index of all stories
router.get('/', async (req, res) => {
  const stories = await db.Story.find({});
  return res.json(stories);
});

// All routes below this middleware require authentication
router.use(require('../config/auth'));

// index of all user's stories
router.get('/user', checkAuth, async (req, res) => {
  const stories = await db.Story.find({ createdBy: req.user.username });
  return res.json(stories);
});

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
