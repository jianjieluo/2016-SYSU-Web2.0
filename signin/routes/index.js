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

router.post('/', function(req, res, next) {
    // begin to regist
});

function isQueryUserInfo(req) {
    var query = req.query;
    if (query.username) {
        return true;
    } else {
        return false;
    }
}

module.exports = router;
