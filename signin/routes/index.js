var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!isQueryUserInfo(req)) {
        res.render('signin');
    } else {
        var q_username = req.query.username;
        res.render('detail', {
            username: q_username
        });
    }
});

function isQueryUserInfo(req) {
    var query = req.query;
    if (query.username) {
        return true;
    } else {
        return false;
    }
}

router.get("/detail", function(req, res) {
    res.render("detail");
});

router.get("/forget", function(req, res) {
    res.render("forget");
});

module.exports = router;
