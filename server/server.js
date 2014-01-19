var express = require('express');
var app = express();

app.use(express.json());

app.use('/', express.static('client/html'));
app.use('/css', express.static('client/css'));
app.use('/js', express.static('client/js'));
app.use('/img', express.static('client/img'));
app.use('/fonts', express.static('client/fonts'));

/*
app.post('/', function(req, res){
    res.send('hello world');
});
*/

var port = process.env.PORT || 3333;
console.log(port);
app.listen(port);