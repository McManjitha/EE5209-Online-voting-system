const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Poll = require('../models/poll');


router.get('/', (req, res) => {
  //console.log("Have");
  res.sendFile(path.join(__dirname, '/poll_login.html'));

});

router.post('/login',  (req, res) => {
    //console.log("HIiiiiiiiiiiii");
    let pollId = req.query.userId;
    //console.log(pollId);

    Poll.findOne({ poll_id: pollId })
    .then(user => {

      // handle user data
      if (pollId == user.poll_id) {
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

/*
val1 = user.opCount1;
      val2 = user.opCount2;
      val3 = user.opCount3;
      val4 = user.opCount4;

      { $set: {opCount1: val1} },
    //{ $set: {opCount2: val2} },
    //{ $set: {opCount3: val3} },
    //{ $set: {opCount4: val4} },

*/ 