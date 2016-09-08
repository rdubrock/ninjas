"use strict";

var userData = require('./user_data.js');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var watson = require("watson-developer-cloud");

var routes = require('./routes/index');
var app = express();
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.get("/watsonRequest", (request, response, next) => {
  response.send("hello")
})

app.post("/watsonRequest", (request, response, next) => {
    var tone_analyzer = watson.tone_analyzer({
      username: userData.username,
      password: userData.password,
      version: 'v3',
      version_date: '2016-05-19'
    });
    tone_analyzer.tone({
      text: request.body.text
    },
  function(err, tone) {
    if (err) console.log(err);
    else {
      response.json(tone);
    }
  })

})

module.exports = app;
