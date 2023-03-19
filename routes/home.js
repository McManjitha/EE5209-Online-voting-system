const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Poll = require('../models/poll');
const fs = require('fs');
const cheerio = require('cheerio');

router.get('/signCreated', (req, res) => {
  console.log("Have");
  res.sendFile(path.join(__dirname, '/created.html'));

});

router.get('/result', (req, res) => {
    //console.log("Have");
    res.sendFile(path.join(__dirname, '/resultLogin.html'));
  
  });

  router.get('/createPoll', (req, res) => {
    //console.log("Have");
    res.sendFile(path.join(__dirname, '/createPoll.html'));
  
  });


router.get('/home/:poll_id', (req, res) => {
    const pollId = req.params;
  
    Poll.findOne({ poll_id: pollId.poll_id })
    .then((pollInfo) => {
  
      if (!pollInfo) {
        res.status(404).json({ message: 'Poll not found' });
        return ;
      }
        // Read the HTML file
      const html = fs.readFileSync(path.join(__dirname, '/showResults.html'), 'utf-8');
  
      // Load the HTML file into Cheerio
      const $ = cheerio.load(html);
  
      // Select the specific div you want to modify and replace its text
      $('#question').text(pollInfo.question);
      $('#r-1').css('width', `${pollInfo.opCount1}%`);
      $('#r-1').text(`${pollInfo.opCount1}`);
      $('#r-2').css('width', `${pollInfo.opCount2}%`);
      $('#r-2').text(`${pollInfo.opCount2}`);
      $('#r-3').css('width', `${pollInfo.opCount3}%`);
      $('#r-3').text(`${pollInfo.opCount3}`);
      $('#r-4').css('width', `${pollInfo.opCount4}%`);
      $('#r-4').text(`${pollInfo.opCount4}`);
      $('#poll-identity').text(pollId.poll_id);

      /*$('#r-1').text(pollInfo.opCount1);
      $('#r-2').text(pollInfo.opCount2);
      $('#r-3').text(pollInfo.opCount3);
      $('#r-4').text(pollInfo.opCount4);*/
      $('#op-1').text(pollInfo.op1);
      $('#op-2').text(pollInfo.op2);
      $('#op-3').text(pollInfo.op3);
      $('#op-4').text(pollInfo.op4);

      /*$('#r-1').text(pollInfo.opCount1);
      $('#r-2').text(pollInfo.opCount2);
      $('#r-3').text(pollInfo.opCount3);
      $('#r-4').text(pollInfo.opCount4);*/
  
      // Get the modified HTML
      const modifiedHtml = $.html();
  
      // Send the modified HTML as the response to your POST request
      res.send(modifiedHtml);
  
    }).catch((err) => {
      console.log(err);
      res.json({ success: false, message: 'Error retrieving poll data' });
    });
  });

  router.post('/create', (req, res) => {
    console.log('done');
    //const newPoll;
    const newPoll = new Poll({
      poll_id : req.query.pollID,
      question : req.query.question,
      op1 : req.query.op1,
      op2 : req.query.op2,
      op3 : req.query.op3,
      op4 : req.query.op4,
      opCount1 : 0,
      opCount2 : 0,
      opCount3 : 0,
      opCount4 : 0
    })

  newPoll.save()
  .then((savedPoll) => {
    console.log('Poll saved successfully:', savedPoll);
    res.send('Poll created successfully');
  })
  .catch((err) => {
    console.error('Error creating poll:', err);
    res.status(500).send('Error creating poll');
  });

  })


module.exports = router;