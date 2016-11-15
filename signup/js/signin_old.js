var http = require('http')
var qs = require('querystring')
var dataHelper = require('./datahelper.js')

var data_path = '../data/test_data.json'
var info_html_path = '../html/info.html'
var signup_html_path = '../html/signup.html'

function parseName(_url) {
    return qs.parse(url.parse(_url).query).username
}

var server = http.createServer(function(req, res) {


    switch (req.url) {
        case '/':
            res.writeHead(200, 'Content-Type': 'text/plain')
            var signuphtml = dataHelper.readHtml(signup_html_path)
            res.write(signuphtml, 'utf8', function() {
                console.log("write the sign up html!")
            });
            res.end();
            break;

    }
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })

    console.log("in the createServer 1")
    var body = ''
    req.on('data', function(data) {
        body += data
    })

    req.on('end', function() {
        var post = qs.parse(body)
        var members = require(data_path)

        console.log("after read the file")
        judgement = checkRepeatInfo(members)
        if (judgement != "pass") {
            responseTheConflictHtml(res, judgement)
        } else {
            writeTheRegisterUserInfomation(data_path, post)
            responseTheSuccessHtml(res, post)
        }

        function checkRepeatInfo(members) {
            for (var i = 0, len = members.length; i < len; ++i) {
                if (post.userName == members[i]['userNmae']) return "userName"
                if (post.userId == members[i]['userId']) return "userId"
                if (post.phoneNum == members[i]['phoneNum']) return "phoneNum"
                if (post.email == members[i]['email']) return "email"
            }
            return "pass"
        }
    })
    res.end()
})

var writeTheRegisterUserInfomation = function writeTheRegisterUserInfomation(data_path, user_info) {
    console.log('writeTheRegisterUserInfomation')
    var membersInfo = require(data_path)
    membersInfo["members"].push(user_info)
    fs.writeFile(data_path, JSON.stringify(membersInfo), 'utf8')
}

var responseTheSuccessHtml = function responseTheSuccessHtml(res, user_info) {
    console.log("responseTheSuccessHtml")
    console.log(typeof userName)
    var newUser = JSON.parse(user_info)
    fs.readFile(info_html_path, function(err, data) {
        if (err) {
            return console.error(err)
        }
        data.replace("{\$(userName)}", newUser['userName'])
        data.replace("{\$(userId)}", newUser['userId'])
        data.replace("{\$(phoneNum)}", newUser['phoneNum'])
        data.replace("{\$(email)}", newUser['email'])
        writeResponseBody()
    })
    var writeResponseBody = function() {
        res.write(data, 'utf8', function() {
            console.log("write the success html")
        })
    }
}


var responseTheConflictHtml = function responseTheConflictHtml(res, judgement) {
    console.log('responseTheConflictHtml')
    var conflictInfo = "<p class=\"conflictInfo\"> The " + judgement + " has been used</p>"
    fs.readFile(signup_html_path, function(err, data) {
        if (err) {
            return console.error(err)
        }
        data.replace("<p class=\"conflictInfo\"></p>", conflictInfo)
        writeResponseBody()
    })
    var writeResponseBody = function() {
        res.write(data, 'utf8', function() {
            console.log("write the success html")
        })
    }
}


var lis_port = 8000
server.listen(lis_port)
console.log("server is listening on " + lis_port)
