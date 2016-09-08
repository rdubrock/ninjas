var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var watson = require("watson-developer-cloud");
const username = "051111a8-6bc4-4e6e-a88d-8d340b69598b";
const password = "GdXQFWYlCQhz";

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
      username,
      password,
      version: 'v3',
      version_date: '2016-05-19'
    });
    tone_analyzer.tone({
      text: request.body.text
    },
  function(err, tone) {
    if (err) console.log(err);
    else {
      console.log(JSON.stringify(tone, null, 2))
      response.json(tone);
    }
  })

})



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });
//

module.exports = app;
