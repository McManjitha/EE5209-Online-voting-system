const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  poll_id: {
    type: Number,
    required: true,
    unique: true,
  },
  poll_password: {
    type: String,
    //required: true,
  },
  question: {
    type: String,
    //required: true,
  },
  op1: {
    type: String,
    //required: true,
  },
  op2: {
    type: String,
    //required: true,
  },
  op3: {
    type: String,
    //required: true,
  },
  op4: {
    type: String,
    //required: true,
  },
  opCount1: {
    type: Number,
    //required: true,
  },
  opCount2: {
    type: Number,
    //required: true,
  },
  opCount3: {
    type: Number,
    //required: true,
  },
  opCount4: {
    type: Number,
    //required: true,
  },

  choices: [{
    type: String,
    //required: true,
  }],
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
