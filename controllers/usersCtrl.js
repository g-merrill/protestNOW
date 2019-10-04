const express = require('express');
const router = express.Router();
const db = require('../models');

// show
router.get('/:id', async (req, res) => {
  const user = await db.User.find({ username: req.params.id });
  return res.json(user);
});

// signup
router.post('/signup', async (req, res) => {
  const user = new db.User(req.body);
  try {
    await user.save();
    // TODO: Send back a JWT instead of the user
    res.json(user);
  } catch (err) {
    // Probably a duplicate username
    res.status(400).json(err);
  }
});



module.exports = router;
