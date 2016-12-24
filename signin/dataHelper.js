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
                if (user != null) {
                    debug("passwd ", md5(passwd), "user.passwd, ", user.passwd);
                    return md5(passwd) == user.passwd ? Promise.resolve(user) :
                        Promise.reject("错误的密码");
                    // 要知道这里面写的信息会在最上层传给拒绝和解决函数的第一个参数的！
                    // 所以想要传什么回去，就把他扔进入Promis.resolve() 里面就好了！！！
                } else {
                    return Promise.reject("没有此用户名");
                }
            });
        },

        createUser: function(user) {
            user.passwd = md5(user.passwd);
            return users.insert(user);
        },

        checkConflict: function(user) {
            // users.findOne({
            //     userName: user.userName
            // })
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
