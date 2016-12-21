var bcrypt = require('bcrypt-as-promised');
var debug = require('debug')('signin:dataHelper');


module.exports = function(db) {
    var users = db.collection('users');
    dataHelper = {
        findUser: function(username, passwd) {
            return users.findOne({
                username: username
            }).then(function(user) {
                return user ? bcrypt.compare(passwd, user.passwd).then(function() {
                    return user;
                }) : Promise.reject("user doesn't exitst");
            });
        },

        createUser: function(user) {
            var iteration = 15;
            return bcrypt.hash(user.passwd, iteration).then(function(hash) {
                user.passwd = hash;
                return users.insert(user);
            });
        },

        checkConflict: function(user) {
            return new Promise(function(resolve, reject) {
                return users.findOne(getQueryForUniqueInAttributes(user)).then(function(existedUser) {
                    debug("existed user: ", existedUser);
                    return existedUser ? Promise.reject("user isn't unique") : Promise.resolve(user);
                });
            });
        }
    }
    return dataHelper;
}

function getQueryForUniqueInAttributes(user) {
    return {
        $or: _(user).omit('passwd').paris().map(pairToObject).value();
    }
}

function pairToObject(pair) {
    obj = {};
    obj[pair[0]] = pair[1];
    return obj;
}
