var crypto = require('crypto');
var debug = require('debug')('signin:dataHelper');


module.exports = function(db) {
    var users = db.collection('users');
    // debug("users collection: ", users);
    dataHelper = {
        findUser: function(username, passwd) {
            return users.findOne({
                userName: username
            }).then(function(user) {
                if (md5(user.passwd) == user.passwd) {
                    return Promise.resolve("Log in successfully").then(function() {
                        debug("Log in successfully");
                    });
                } else {
                    return Promise.reject("No such a user");
                }
            }).catch(function(err) {
                debug("find one operation err message :", err);
            });
        },

        createUser: function(user) {
            user.passwd = md5(user.passwd);
            return users.insert(user);
        },

        checkConflict: function(user) {
            return Promise.resolve("pass user checkConflict");
        }
    }
    return dataHelper;
}

// function getQueryForUniqueInAttributes(user) {
//     return {
//         $or: _(user).omit('passwd').paris().map(pairToObject).value()
//     };
// }
//
// function pairToObject(pair) {
//     obj = {};
//     obj[pair[0]] = pair[1];
//     return obj;
// }

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};
