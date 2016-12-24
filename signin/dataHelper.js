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
            var queryCondition = {
                $or: [{
                    userName: user.userName
                }, {
                    userId: user.userId
                }, {
                    phoneNum: user.phoneNum
                }, {
                    email: user.email
                }]
            };
            return users.findOne(queryCondition).then(function(user) {
                debug("检查信息重复的信息输出：", user);
                if (user != null) {
                    return Promise.reject("填写的基本信息和数据库中的原有的信息有冲突")
                } else {
                    return Promise.resolve("pass user checkConflict");
                }
            });
        }
    }
    return dataHelper;
}

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};
