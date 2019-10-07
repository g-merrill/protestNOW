const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

// show
router.get('/:id', async (req, res) => {
  const user = await db.User.find({ username: req.params.id });
  return res.json(user);
});

// signup
router.post('/signup', async (req, res) => {
  console.log('Made it to position 1')
  const user = new db.User(req.body);
  console.log('Made it to position 2', user)
  try {
    console.log('Made it to position 3');
    await user.save();
    console.log('Made it to position 4', user);
    const token = createJWT(user);
    console.log('Made it to position 5');
    console.log('token created!: ', token);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate username
    console.log('did not save!');
    res.status(400).json(err);
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ err: 'bad credentials' });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: 'bad credentials' });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
});

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: '24h' }
  );
}

module.exports = router;
