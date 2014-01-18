var express = require('express');
var app = express();

app.use(express.json());

app.use('/', express.static('client/'));

/*
app.post('/', function(req, res){
    res.send('hello world');
});
*/

app.listen(3333);