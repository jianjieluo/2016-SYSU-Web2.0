var http = require('http')
var qs = require('querystring')
var fs = require('fs')
var data_path = '../data/test_data.json'
var info_html_path = '../html/info.html'
var signup_html_path = '../html/signup.html'

var server = http.createServer(function(req, res) {
    if (req.method == 'POST') {
        var body = ''
        req.on('data', function(data) {
            body += data
        })

        req.on('end', function() {
            var post = qs.parse(body)
                // fs.readFile(data_path, function(err, data) {
                //     if (err) {
                //         throw err;
                //     }
                //     var members = data.toJSON()
                //     console.log(data)
                //     judgement = checkRepeatInfo(members)
                //     if (judgement != "pass") {
                //         responseTheConflictHtml(res, judgement)
                //     } else {
                //         writeTheRegisterUserInfomation(data_path, post)
                //         responseTheSuccessHtml(res, post)
                //     }
                // })

            var members = require("../data/test_data.json")
            console.log(members.toString())
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
    } else {
        console.log("[501] " + req.method + " to " + req.url);
        res.writeHead(501, "Not implemented", {
            'Content-Type': 'text/html'
        });
        res.write('<html><head><title>501 - Not implemented</title></head><body><h1>Please use the Post request Method</h1></body></html>')
    }
    res.end()
})

var writeTheRegisterUserInfomation = function writeTheRegisterUserInfomation(data_path, user_info) {
    var membersInfo = require(data_path)
    var newUser = JSON.parse(user_info)
    membersInfo["members"].push(newUser)
    fs.writeFile(data_path, JSON.stringify(membersInfo), 'utf8')
}

var responseTheSuccessHtml = function responseTheSuccessHtml(res, user_info) {
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
