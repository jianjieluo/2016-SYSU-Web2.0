var dataHelper = require("./dataHelper");

var userManager = {
    findUser: function(username, passwd) {
        return dbHelper.findUser(username, passwd);
    },

    registUser: function(user) {
        if (!this.userFormatJudger(user)) return "Infomation Format failed";
        else return this.createUser(user);
    },

    createUser: function(user) {
        var conflict_error = dataHelper.checkConflict(user);
        if (!conflict_error) {
            return "success";
        } else {
            return "Conflict: " + conflict_error;
        }
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
        var regex = /^[a-z]{1}[0-9_a-z]{2,11}$/
        if (!regex.test(data)) {
            return false;
        }
        return true;
    },

    userIdJudger: function(data) {
        var regex = /[1-9]\d{7}/
        if (!regex.test(data)) {
            return false;
        }
        return true;
    },

    passwdJudger: function(data) {
        if (data.length > 12) {
            return false;
        }
        var regex = /[0-9_a-zA-Z\-]{6,}/
        if (!regex.test(data)) {
            return false;
        }
        return true;
    },

    repasswdJudger: function(passwd, data) {
        return passwd === data;
    },

    phoneNumJudger: function(data) {
        var regex = /[1-9]\d{10}/
        if (!regex.test(data)) {
            return false
        }
        return true
    },

    emailJudger: function(data) {
        var regex = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/
        if (!regex.test(data)) {
            return false
        }
        return true
    }
}

module.exports = userManager;
