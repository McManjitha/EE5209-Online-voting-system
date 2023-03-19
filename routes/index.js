/*const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Poll = require('../models/Poll');

const router = express.Router();

// Login route
router.get('/', (req, res) => {
  console.log('====================================');
  console.log("sdfsdfsd");
  console.log('====================================');
  res.render('login');
});*/

/*router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.redirect('/');
    return;
  }

  req.session.user = user;
  res.redirect('/poll');
});*/

// Poll route
/*router.get('/poll', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/');
    return;
  }

  const { poll_id } = req.query;
  //const poll = await Poll.findOne({ poll_id });
  Poll.findOne({ poll_id })
  .then(poll =>{
    if (!poll) {
      res.status(404).send('Poll not found');
      return;
    }
  
    res.render('poll', { poll });
  })

  /*if (!poll) {
    res.status(404).send('Poll not found');
    return;
  }

  res.render('poll', { poll });
});

// Vote route
router.post('/vote', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/');
    return;
  }

  const { answer } = req.body;
  const { poll_id } = req.query;
  //const poll = await Poll.findOne({ poll_id });

  Poll.findOne({ poll_id })
  .then(poll => {
    if (!poll) {
      res.status(404).send('Poll not found');
      return;
    }
  
    // Add the vote to the poll
    poll.votes.set(answer, (poll.votes.get(answer) || 0) + 1);
    poll.save();
  
    res.redirect('/');
  })

  /*if (!poll) {
    res.status(404).send('Poll not found');
    return;
  }

  // Add the vote to the poll
  poll.votes.set(answer, (poll.votes.get(answer) || 0) + 1);
  await poll.save();

  res.redirect('/');
});

module.exports = router;*/
