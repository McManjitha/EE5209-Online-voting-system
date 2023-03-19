const express = require('express');
const router = express.Router();
const Poll = require('../models/poll');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');


router.get('/noted', (req, res) => {
  console.log("Had");
  res.sendFile(path.join(__dirname, '/thankyou.html'));

});


router.get('/:poll_id', (req, res) => {
  const pollId = req.params;

  Poll.findOne({ poll_id: pollId.poll_id })
  .then((pollInfo) => {

    if (!pollInfo) {
      res.status(404).json({ message: 'Poll not found' });
      return ;
    }
      // Read the HTML file
    const html = fs.readFileSync(path.join(__dirname, '/poll.html'), 'utf-8');

    // Load the HTML file into Cheerio
    const $ = cheerio.load(html);

    // Select the specific div you want to modify and replace its text
    $('#qq').text(pollInfo.question);
    $('#op-1').text(pollInfo.op1);
    $('#op-2').text(pollInfo.op2);
    $('#op-3').text(pollInfo.op3);
    $('#op-4').text(pollInfo.op4);
    $('#poll-identity').text(pollId.poll_id);

    // Get the modified HTML
    const modifiedHtml = $.html();

    // Send the modified HTML as the response to your POST request
    res.send(modifiedHtml);

  }).catch((err) => {
    console.log(err);
    res.json({ success: false, message: 'Error retrieving poll data' });
  });
});

router.post('/mark', (req, res) => {
  let pollId = req.query.poll;
  let option = req.query.choice;

  //console.log(dbOption);
  Poll.findOne({ poll_id: pollId })
    .then(user => {
      //currentVal = user.dbOption;
      if(option == 'op-1'){
        Poll.findOneAndUpdate(
          { poll_id: pollId },
          {$inc : {opCount1: 1}},
          { new: true }
        )
        .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
        .catch((error) => console.log('Error updating document', error));
      }else if(option == 'op-2'){
        Poll.findOneAndUpdate(
          { poll_id: pollId },
          {$inc : {opCount2: 1}},
          { new: true }
        )
        .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
        .catch((error) => console.log('Error updating document', error));
      }else if(option == 'op-3'){
        Poll.findOneAndUpdate(
          { poll_id: pollId },
          {$inc : {opCount3: 1}},
          { new: true }
        )
        .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
        .catch((error) => console.log('Error updating document', error));
      }else if(option == 'op-4'){
        Poll.findOneAndUpdate(
          { poll_id: pollId },
          {$inc : {opCount4: 1}},
          { new: true }
        )
        .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
        .catch((error) => console.log('Error updating document', error));
      }
    })
  res.send('updated');

});

module.exports = router;
