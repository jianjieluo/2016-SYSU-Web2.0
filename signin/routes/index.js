var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:index');

module.exports = function(db) {
    // debug("user db connect as :", db.collection('users'));
    var userManager = require("../userManager")(db);
    /* GET basic page. */
    router.get("/", function(req, res) {
        res.redirect('/signin');
    });

    router.get("/signin", function(req, res) {
        var errorMessage = req.query.errorMessage;
        if (!errorMessage) {
            res.render("signin");
        } else {
            res.render("signin", {
                error: errorMessage
            });
        }
    });
    // log in logic
    router.post("/signin", function(req, res) {
        var user = req.body;
        userManager.findUser(user.userName, user.passwd)
            .then(function(user) {
                req.session.user = user;
                res.redirect("/detail");
            }, function() {
                res.redirect("/signin?errorMessage=No such an account of incorrect password!");
            });
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
        userManager.registUser(user).then(function(user) {
            req.session.user = user;
            res.redirect("/detail");
        }).catch(function(err) {
            res.redirect("/regist?errorMessage=" + err);
        })
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
    return router;
}
