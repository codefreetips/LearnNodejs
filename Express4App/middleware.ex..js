var express = require('express');
var app = express();
var router = express.Router();
var port = 8000;

 
app.get('/', function (req, res) {
    res.render('index');
});


function log(req, res,next){

    console.log("log");
    next();
}

function hello(req, res){
    res.write("Hello \n");
    res.end();
}


module.exports = router;