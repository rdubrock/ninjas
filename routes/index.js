"use strict"

var express = require('express');
var router = express.Router();
var watson = require("watson-developer-cloud");

router.get("/watsonRequest", (request, response, next) => {
  response.send("hello")
})
/* GET home page. */

module.exports = router;
