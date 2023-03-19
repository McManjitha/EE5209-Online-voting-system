const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Poll = require('./models/poll');

mongoose.connect('mongodb://127.0.0.1/voting-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch((error) => {
  console.log('Error connecting to database:', error);
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false,
}));

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
console.log(__dirname);



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const userloginRouter = require('./routes/userLogin');
const pollloginRouter = require('./routes/login');
const pollRouter = require('./routes/poll');
const homeRouter = require('./routes/home');
//const markRouter = require('./routes/poll');

app.use('/', userloginRouter);
app.use('/hello', pollloginRouter);
app.use('/poll', pollRouter);
app.use('/home', homeRouter);
//app.use('/mark', pollRouter);

const newPoll = new Poll({
  "poll_id": 6,
  "poll_password": "password1",
  "question": "What is your favorite color?",
  "op1": "Red",
  "op2": "Green",
  "op3": "Blue",
  "op4": "Yellow",
  "opCount1": 0,
  "opCount2": 0,
  "opCount3": 0,
  "opCount4": 0 
});

const newUser = new User({
  "username":"admin",
  "password":"123"
});

/*newUser.save()
  .then((book) => {
    console.log(`${book.poll_id} saved to database.`);
  })
  .catch((err) => {
    console.error(err);
  });*/



