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
        },

        createUser: function(user) {
            dataHelper.checkConflict(user).then(function() {
                // 同样要保证dataHelper.createUser() 返回的是一个promise
                return dataHelper.createUser(user);
            }, function(err) {
                return Promise.reject(err);
            });
        },

        userFormatJudger: function(user) {
            return userNameJudger(user.userName) && userIdJudger(user.userId) &&
                passwdJudger(user.passwd) && repasswdJudger(user.passwd, user.repasswd) &&
                phoneNumJudger(user.phoneNum) && emailJudger(user.email);
        },

        userNameJudger: function(data) {
            if (data.length < 6 || data.length > 18) {
                return false;
            }
            var regex = /^[a-z]{1}[0-9_a-z]{2,11}$/;
            if (!regex.test(data)) {
                return false;
            }
            return true;
        },

        userIdJudger: function(data) {
            var regex = /[1-9]\d{7}/;
            if (!regex.test(data)) {
                return false;
            }
            return true;
        },

        passwdJudger: function(data) {
            if (data.length > 12) {
                return false;
            }
            var regex = /[0-9_a-zA-Z\-]{6,}/;
            if (!regex.test(data)) {
                return false;
            }
            return true;
        },

        repasswdJudger: function(passwd, data) {
            return passwd === data;
        },

        phoneNumJudger: function(data) {
            var regex = /[1-9]\d{10}/;
            if (!regex.test(data)) {
                return false
            }
            return true
        },

        emailJudger: function(data) {
            var regex = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/;
            if (!regex.test(data)) {
                return false
            }
            return true
        }
    }
    return userManager;
}
