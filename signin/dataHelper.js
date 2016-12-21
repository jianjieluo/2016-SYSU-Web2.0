var debug = require('debug')('signin:dataHelper');
var MongoClient = require('mongodb').MongoClient
var dburl = 'mongodb://localhost:27017/signin';

MongoClient.connect(dburl, function(err, db) {
    console.log("Connected successfully to server");
    debug("user db connect as :", db.collection('users'));
    db.close();
});

dataHelper = {
    findUser: function(username, passwd) {

    }
}

module.exports = dataHelper;
