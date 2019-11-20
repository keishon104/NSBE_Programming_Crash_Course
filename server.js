// Requires the packages to make the server run
const express = require('express');
const bodyParser =require('body-parser');
const app = express();


// Includes the environment variables
require('dotenv').config();

const port = process.env.PORT; //making port

// Tells the server what to do when starting the server
app.listen(port, function(){
  console.log('Welcome NSBE, View your website at localhost:' + process.env.PORT + '/');
});

// Sets the view engine for the website
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Sends users to html homepage
app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));


// Function to send
app.post('/message', (req,res) => {
  // Initializes varables for Twilio SMS
  const accountSid = process.env.TWILIO_ACCOUNTSID;
  const authToken = process.env.AUTHTOKEN;
  const client = require('twilio')(accountSid, authToken);

  // console.log(req.body.txt_msg);
  // Creates the message to be sent to the phone
  client.messages
  .create({
     body: req.body.txt_msg,
     from: process.env.TWILIO_FROM_NUMBER,
     to: process.env.TWILIO_TO_NUMBER
   })
  .then(message => console.log('Test Message'));

  res.redirect('/');
  console.log(req.body.txt_msg);


});
