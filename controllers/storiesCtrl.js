const express = require('express');
const router = express.Router();
const db = require('../models');


// add story
router.post('/create', async (req, res) => {
  let story = new db.Story(req.body);
  try {
    story = await story.save();
    let protest = await db.Protest.findById(story.protest);
    protest.stories.push(story);
    protest = await protest.save();
    let user = await db.User.findById(story.creator);
    user.createdStories.push(story);
    user = await user.save();
    res.json(story);
  } catch (err) {
    // Error saving to the database
    res.status(400).json(err);
  }
});

// get one story
router.get('/:id', async (req, res) => {
  const story = await db.Story.findById(req.params.id).populate('protest').populate('creator');
  return res.json(story);
});

router.delete('/:id', async (req, res) => {
  const deletedStory = await db.Story.findByIdAndDelete(req.params.id);
  // find attached protest and delete from that protest's stories array
  await db.Protest.findByIdAndUpdate(deletedStory.protest, { $pull: { stories: deletedStory._id }});
  // find attached creator and delete from that user's createdStories array
  await db.User.findByIdAndUpdate(deletedStory.creator, { $pull: { createdStories: deletedStory._id }});
  return res.json(deletedStory);
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
