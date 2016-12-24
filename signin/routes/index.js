var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:index');

module.exports = function(db) {
    var userManager = require("../userManager")(db);
    /* GET basic page. */

    router.get("/", function(req, res) {
        var queryname = req.query.username;
        if (!queryname) {
            req.session.user ? res.redirect("/detail") : res.redirect('/signin');
        } else {
            if (req.session.user) {
                (queryname == req.session.user.userName) ? res.redirect("/detail"): res.redirect("/detail?errorMessage=" + "只能够访问自己的数据");
            } else {
                res.redirect('/signin');
            }
        }
    });

    router.get("/signin", function(req, res) {
        if (req.session.user) res.redirect("/detail");

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
            .then(function(login_user) {
                req.session.user = login_user;
                res.redirect("/detail");
            }, function(message) {
                debug("log in reject :", message)
                res.redirect("/signin?errorMessage=" + message);
            });
    });

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
        userManager.registUser(user).then(function(message) {
            req.session.user = user;
            res.redirect("/detail");
        }).catch(function(err) {
            debug("createUser failed reason :", err);
            res.redirect("/regist?errorMessage=" + err);
        })
    });

    router.get("/signout", function(req, res) {
        delete req.session.user;
        res.redirect("/signin");
    });

    router.get("/forget", function(req, res) {
        res.render("forget");
    });

    router.all('*', function(req, res, next) {
        req.session.user ? next() : res.redirect('/signin');
    });

    router.get("/detail", function(req, res) {
        var errorMessage = req.query.errorMessage;
        res.render("detail", {
            user: req.session.user,
            error: errorMessage
        });
    });
    return router;
}
