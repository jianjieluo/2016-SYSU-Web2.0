var express = require('express');
var router = express.Router();
var userManger = require("../userManager");

/* GET basic page. */

router.get("/signin", function(req, res) {
    var error = req.query.error;
    if (!error) {
        res.render("signin");
    } else {
        res.render("signin", error);
    }
});

// log in logic
router.post("./signin", function(req, res) {
    var user = req.body;
    if (userManager.findUser(user.userName, user.passwd)) {
        req.session.user = user;
        res.redirect("/detail");
    } else {
        res.redirect("/signin?error=No such an account of incorrect password!");
    }
})

// 注册
router.get("/regist", function(req, res) {
    var errorMessage = req.query.errorMessage;
    if (!errorMessage) {
        res.render("regist");
    } else {
        res.render("regist", {
            error: errorMessage
        });
    }
});

router.post('/regist', function(req, res) {
    var user = req.body;
    var errorMessage = userManager.registUser(user);
    if (errorMessage == "success") {
        req.session.user = user;
        res.redirect("/detail");
    } else {
        res.redirect("/regist?errorMessage=" + errorMessage);
    }
});

router.get("/signout", function(req, res) {
    delete req.session.user;
    res.redirect("/signin");
});

router.get("/detail", function(req, res) {
    res.render("detail", req.session.user);
});

router.get("/forget", function(req, res) {
    res.render("forget");
});

router.all('*', function(req, res, next) {
    req.session.user ? next() : res.redirect('/signin');
});

module.exports = router;
