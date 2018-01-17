sqlite3 = require('sqlite3').verbose();
var consts = require( './const/const');
var config = require( './config/db');
const express = require('express')
const app = express()
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

var markets = require('./routes/markets');

app.get('/api/markets/list', markets.marketsList);
app.get('/api/markets/:currency/:type/:day/:endDate', markets.marketsGraph);

app.use('/', express.static(__dirname + '/'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(consts.port, function() {
  console.log("server started on port: "+consts.port);
});