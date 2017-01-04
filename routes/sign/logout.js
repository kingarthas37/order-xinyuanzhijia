'use strict';

var router = require('express').Router();
var AV = require('leanengine');

router.get('/', function(req, res) {
    req.currentUser.logOut();
    res.clearCurrentUser();
    res.redirect('/');
});

module.exports = router;