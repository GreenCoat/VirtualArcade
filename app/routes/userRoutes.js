const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const mustBeLoggedIn = require('../middleware/mustBeLoggedIn');

function getCurrentUser(req, res) {
  console.log('CURRENT:');
  console.log(req.session);
  // I'm picking only the specific fields its OK for the audience to see publicly
  // never send the whole user object in the response, and only show things it's OK
  // for others to read (like ID, name, email address, etc.)
  const { id, username } = req.user;
  res.json({
    id, username
  });
}

router.route('/auth')
  // GET to /api/auth will return current logged in user info
  .get((req, res) => {
    console.log('GET:');
    console.log(req.session);
    if (!req.user) {
      console.log('User not logged in');
      return res.status(401).json({
        message: 'You are not currently logged in.'
      })
    }
    console.log('Getting user');

    getCurrentUser(req, res);
  })
  // POST to /api/auth with username and password will authenticate the user
  .post(passport.authenticate('local'), (req, res) => {
    console.log('LOGIN:');
    console.log(req.session);
    if (!req.user) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      })
    }
    getCurrentUser(req, res);
  })
  // DELETE to /api/auth will log the user out
  .delete((req, res) => {
    console.log('DELETE:');
    console.log(req.session);
    req.logout();
    req.session.destroy();
    res.json({
      message: 'You have been logged out.'
    });
  });

router.route('/users')
  // POST to /api/users will create a new user
  .post((req, res, next) => {
    console.log('CREATE:');
    console.log(req.session);
    db.User.create(req.body)
      .then(user => {
        const { id, username } = user;
        res.json({
          id, username
        });
      })
      .catch(err => {
        // if this error code is thrown, that means the username already exists.
        // let's handle that nicely by redirecting them back to the create screen
        // with that flash message
        if (err.code === 11000) {
          res.status(400).json({
            message: 'Username already in use.'
          })
        }

        // otherwise, it's some nasty unexpected error, so we'll just send it off to
        // to the next middleware to handle the error.
        next(err);
      });
  });

module.exports = router;