var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Express is Web Framework',
        psr: "PSR(Problem Step Record) for test ... Express Nodejs"
    });
});

module.exports = router;