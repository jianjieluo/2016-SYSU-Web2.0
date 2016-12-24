var debug = require('debug')('signin:userManager');

module.exports = function(db) {
    // debug("user db connect as :", db.collection('users'));
    var dataHelper = require("./dataHelper")(db);
    var userManager = {
        findUser: function(username, passwd) {
            return dataHelper.findUser(username, passwd);
            // 保证dataHelper.findUser()返回的是一个promise就好
        },

        registUser: function(user) {
            if (!userFormatJudger(user)) {
                return Promise.reject("Infomation Format failed");
            } else {
                // 也要保证createUser()这个函数返回的是promise才行
                return createUser(user);
            }
        }
    }
    return userManager;

    function createUser(user) {
        return dataHelper.checkConflict(user).then(function() {
            // 同样要保证dataHelper.createUser() 返回的是一个promise
            return dataHelper.createUser(user);
        }).catch(function(message) {
            debug("createUser failed reason :", message);
            return Promise.reject(message);
        });
    }


    function userFormatJudger(user) {
        return userNameJudger(user.userName) && userIdJudger(user.userId) &&
            passwdJudger(user.passwd) && repasswdJudger(user.passwd, user.repasswd) &&
            phoneNumJudger(user.phoneNum) && emailJudger(user.email);
    }

    function userNameJudger(data) {
        if (data.length < 6 || data.length > 18) {
            return false;
        }
        var regex = /^[a-zA-Z]{1}[0-9_a-zA-Z]{2,11}$/;
        if (!regex.test(data)) {
            return false;
        }
        return true;
    }

    function userIdJudger(data) {
        var regex = /[1-9]\d{7}/;
        if (!regex.test(data)) {
            return false;
        }
        return true;
    }

    function passwdJudger(data) {
        if (data.length > 12) {
            return false;
        }
        var regex = /[0-9_a-zA-Z\-]{6,}/;
        if (!regex.test(data)) {
            return false;
        }
        return true;
    }

    function repasswdJudger(passwd, data) {
        return passwd === data;
    }

    function phoneNumJudger(data) {
        var regex = /[1-9]\d{10}/;
        if (!regex.test(data)) {
            return false
        }
        return true
    }

    function emailJudger(data) {
        var regex = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/;
        if (!regex.test(data)) {
            return false
        }
        return true
    }
}
