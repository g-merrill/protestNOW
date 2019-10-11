const express = require('express');
const router = express.Router();
const db = require('../models');


// add story
router.post('/create', async (req, res) => {
  let story = new db.Story(req.body);
  // try {
  story = await story.save();
  let protest = await db.Protest.findById(story.protest);
  console.log('saved story', story);
  protest.stories.push(story);
  console.log(protest);
  protest = await protest.save();
  console.log(protest);
  let user = await db.User.findById(story.creator);
  console.log(user);



  res.json(story);
  // } catch (err) {
    // Error saving to the database
    // res.status(400).json(err);
  // }
});


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
