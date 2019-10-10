const express = require('express');
const cloudinary = require('cloudinary');

const router = express.Router();

// image-upload
router.post('/image-upload', async (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));
  Promise.all(promises).then(results => res.json(results));
});

module.exports = router;
