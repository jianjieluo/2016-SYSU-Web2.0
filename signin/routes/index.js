var express = require('express');
var router = express.Router();

var users = {};

/* GET basic page. */
router.get('/', function(req, res, next) {
    if (!isQueryUserInfo(req)) {
        res.redirect('signin');
    } else {
        var q_username = req.query.username;
        res.redirect('detail', {
            userName: q_username
        });
    }
});

router.get("/signin", function(req, res) {
    res.render("signin");
});

router.get("/regist", function(req, res) {
    res.render("regist");
});

router.get("/detail", function(req, res) {
    res.render("detail", req.session.user);
});

router.get("/forget", function(req, res) {
    res.render("forget");
});

// 注册
router.post('/regist', function(req, res, next) {
    // begin to regist
    var user = req.body;
    var formatFlag = userFormatJudger(user);
    if (userFormatJudger(user)) {
        req.session.user = users[user.userName] = user;
        res.redirect("/detail");
    }
});

router.all('*', function(req, res, next) {
    req.session.user ? next() : res.redirect('/signin');
});

module.exports = router;

function isQueryUserInfo(req) {
    var query = req.query;
    return query.username;
}

function userFormatJudger(user) {
    return userNameJudger(user.userName) && userIdJudger(user.userId) &&
        passwdJudger(user.passwd) && repasswdJudger(user.passwd, user.repasswd) &&
        phoneNumJudger(user.phoneNum) && emailJudger(user.email);
};

function userNameJudger(data) {
    if (data.length < 6 || data.length > 18) {
        return false;
    }
    var regex = /^[a-z]{1}[0-9_a-z]{2,11}$/
    if (!regex.test(data)) {
        return false;
    }
    return true;
};

function userIdJudger(data) {
    var regex = /[1-9]\d{7}/
    if (!regex.test(data)) {
        return false;
    }
    return true;
};

function passwdJudger(data) {
    if (data.length > 12) {
        return false;
    }
    var regex = /[0-9_a-zA-Z\-]{6,}/
    if (!regex.test(data)) {
        return false;
    }
    return true;
};

function repasswdJudger(passwd, data) {
    return passwd === data;
};

function phoneNumJudger(data) {
    var regex = /[1-9]\d{10}/
    if (!regex.test(data)) {
        return false
    }
    return true
};

function emailJudger(data) {
    var regex = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/
    if (!regex.test(data)) {
        return false
    }
    return true
};
