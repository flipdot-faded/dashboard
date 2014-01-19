var express = require('express');
var app = express();

app.use(express.json());

app.use('/', express.static('client/public/html'));
app.use('/css', express.static('client/public/css'));
app.use('/js', express.static('client/public/js'));
app.use('/img', express.static('client/public/img'));
app.use('/fonts', express.static('client/public/fonts'));

/*
app.post('/', function(req, res){
    res.send('hello world');
});
*/

var port = process.env.PORT || 3333;
console.log(port);
app.listen(port);