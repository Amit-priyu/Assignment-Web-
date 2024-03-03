const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

// our middleware..
app.use(function(req,res,next){
  // finding the user id from the header..
  const userid=req.headers["user-id"];
  // check if user exists (0,1,2,3,4,5)
  if(numberOfRequestsForUser[userid]){
    // if yes increment the count and after that check with it is greater than 5
    numberOfRequestsForUser[req.headers["user-id"]]=numberOfRequestsForUser[req.headers["user-id"]]+1;
    if(numberOfRequestsForUser[userid]>5){
      res.status(404).send("no entry-data is blocked!")
    }
    else{
      // call the next function
      next();
    }
  }
  else{
    // for the first user entry with 1
    numberOfRequestsForUser[userid]=1;
    next();
  }
})


app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;