'use strict';

var router = require('express').Router();
var AV = require('leanengine');

router.get('/', function(req, res) {
    AV.User.logOut();
    res.redirect('/');
});

module.exports = router;