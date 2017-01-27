
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})
