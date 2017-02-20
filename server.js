var express = require('express');
var app = express();
var http = require('http');

app.get('/', function(req, res) {
    var ip = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || req.socket.remoteAddress 
    || req.connection.socket.remoteAddress;
    var language = req.headers['accept-language'].split(',')[0];
    var software = req.headers['user-agent'].split(') ')[0].split(' (')[1];

    var result = { ipaddress : ip, language: language, software: software }
  
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
});

var server = http.createServer(app).listen(8080);