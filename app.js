
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './public/html'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
})
