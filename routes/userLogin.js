const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Poll = require('../models/poll');

router.get('/', (req, res) => {
    //console.log("Have");
    res.sendFile(path.join(__dirname, '/user_login.html'));
});

router.get('/home', (req, res) => {
    //console.log("Have");
    res.sendFile(path.join(__dirname, '/home.html'));
  
});

router.post('/userlogin',  (req, res) => {
    console.log("HIiiiiiiiiiiii");
    let userId = req.query.userId;
    //console.log(pollId);

    User.findOne({ username: userId })
    .then(user => {

      // handle user data
      if (userId == user.username) {
        req.session.user = user;
        res.send("good");

      } else {
        console.log("Invalid username or password");
        res.json({ success: false, message: 'Invalid username or password' });
        
      }
    })
    .catch(err => {
      // handle error
      console.log(err);
      console.log("An error occurred");
      res.json({ success: false, message: 'Error logging in. Please try again later' });
    });
    
    
});

  module.exports = router;