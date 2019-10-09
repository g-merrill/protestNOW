const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');

// setup environment
require('dotenv').config();

// controllers
const usersCtrl = require('./controllers/usersCtrl');
const protestsCtrl = require('./controllers/protestsCtrl');
const storiesCtrl = require('./controllers/storiesCtrl');

const app = express();

// setup cors
const corsOptions = {
  origin: process.env.CORS_WHITELIST
}

// middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));



// api routes
app.use('/api/v1/users', usersCtrl);
app.use('/api/v1/protests', protestsCtrl);
app.use('/api/v1/stories', storiesCtrl);

// Since this route is a "catch all" that matches every get request, be sure to mount API or other routes before it!
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});
