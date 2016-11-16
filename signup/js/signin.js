var http = require('http');
var url = require('url');
var qs = require('querystring')
var dataHelper = require('./dataHelper.js');
var infoJudger = require('./infoJudger.js');

var data_path = '../data/test_data.json'
var info_html_path = '../html/info.html'
var signup_html_path = '../html/signup.html'
var register_fail_html_path = '../html/registerFail.html'
var basic_css_path = '../css/basic.css'
var signup_css_path = '../css/signup.css'
var client_js_path = './client.js';
var lis_port = 8000;


http.createServer(function(req, res) {
    var url_parts = url.parse(req.url);
    console.log("url_parts.pathname is :" + url_parts.pathname)
    console.log('the request Method is :' + req.method)

    if (req.method == "POST") {
        console.log("begin to get the post body --- register info");
        var fullbody = '';

        req.on('data', function(chunk) {
            fullbody += chunk;
        });

        req.on('end', function() {
            var regitser_info = qs.parse(fullbody);
            display_register_feedback(req, res, regitser_info);
        });
        return;
    }

    var search_username = qs.parse(url_parts.query).username;

    switch (url_parts.pathname) {
        case '/':
            if (req.method == 'POST') {
                console.log("begin to register....")
                var fullbody = '';
                req.on('data', function(chunk) {
                    fullbody += chunk;
                });

                req.on('end', function() {
                    var regitser_info = qs.parse(fullbody);
                    display_register_feedback(req, res, regitser_info);
                });
            } else {
                if (search_username) {
                    display_info(res, req, search_username);
                } else {
                    display_signup(signup_html_path, req, res);
                }
            }
            break;
            // case '/?username=abc':
            //     var search_username = qs.parse(url_parts.query).username;
            //     display_info(req, res, search_username);
            //     break;
        case '/css/basic.css':
            sendCssFile(basic_css_path);
            break;
        case '/css/signup.css':
            sendCssFile(signup_css_path);
            break;
        case '/js/client.js':
            sendJsFile(client_js_path);
            break;
        default:
            display_404(url_parts.pathname, req, res);
            break;
    }
    return;

    // begin to implement the functions above
    //
    // correct
    function display_signup(url, req, res) {
        console.log('enter the display_signup function')
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        var html = dataHelper.readHtml(url);

        res.end(html);
        console.log('-----------------end display_signup()--------------------')
    }

    function display_register_feedback(req, res, user_info) {
        console.log('enter the display_register_feedback function')
            // read the members
        var members_info = require(data_path);
        var len = members_info["members"].length;

        for (var i = 0; i < len; ++i) {
            if (user_info.userName == members_info['members'][i]['userName']) {
                conflict_info = 'userName';
                display_conflict(req, res, conflict_info);
                return;
            }
            if (user_info.userId == members_info['members'][i]['userId']) {
                conflict_info = 'userId';
                display_conflict(req, res, conflict_info);
                return;
            }
            if (user_info.phoneNum == members_info['members'][i]['phoneNum']) {
                conflict_info = 'phoneNum';
                display_conflict(req, res, conflict_info);
                return;
            }
            if (user_info.email == members_info['members'][i]['email']) {
                conflict_info = 'email';
                display_conflict(req, res, conflict_info);
                return;
            }
        }

        console.log('register successfully');
        var register_info = {};
        register_info["userName"] = user_info.userName;
        register_info["userId"] = user_info.userId;
        register_info['phoneNum'] = user_info.phoneNum;
        register_info['email'] = user_info.email;

        dataHelper.addUserData(data_path, members_info);
        display_info(req, res, user_info.userName);
    }

    function display_conflict(req, res, conflict_info) {
        console.log('enter the display_conflict function')
        var data = dataHelper.readHtml(signup_html_path);
        var html = data.toString();
        // html = html.replace("{\$(conflict_info)}", "information conflict with database on " + conflict_info);
        html = html.replace("<p class=\"conflictInfo\"></p>", "<p class=\"conflictInfo\">information conflict with database on :" + conflict_info + "</p>");

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        console.log('leave the current funcions')
        res.end(html);
    }


    // correct run
    function display_info(res, req, search_username) {
        var members_info = require(data_path);
        var len = members_info["members"].length;

        for (var i = 0; i < len; ++i) {
            if (search_username == members_info['members'][i]['userName']) {
                console.log(members_info['members'][i])

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                var data = dataHelper.readHtml(info_html_path);
                var html = data.toString();

                html = html.replace("{\$(userName)}", members_info['members'][i]['userName'])
                html = html.replace("{\$(userId)}", members_info['members'][i]['userId'])
                html = html.replace("{\$(phoneNum)}", members_info['members'][i]['phoneNum'])
                html = html.replace("{\$(email)}", members_info['members'][i]['email'])

                // console.log(html)
                res.end(html);
                console.log('------------leave info() with successful request---------------')
                return;
            }
        }
        console.log("'------------leave info(), no such a user, response with the sign up page---------------'")
        display_signup(signup_html_path, req, res);
    }

    function getRegisterInfo(req) {
        console.log("begin to get the post body --- register info");
        var fullbody = '';

        req.on('data', function(chunk) {
            fullbody += chunk.toString();
        });

        console.log(typeof fullbody);
        console.log('leave the current funcions')
        return JSON.stringify(fullbody);
    }

    function display_404(url, req, res) {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.write("<h1 > 404 Not Found < /h1>");
        res.end("The page you were looking for: " + url + " an not be found ");
    }

    function sendCssFile(url) {
        var css = dataHelper.readCode(url);
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });
        res.end(css);
        console.log("-----------------send the css file successfully------------------")
    }

    function sendJsFile(url) {
        var js = dataHelper.readCode(url);
        res.writeHead(200, {
            'Content-Type': 'text/javascript'
        });
        res.end(js);
        console.log("-----------------send the js file successfully------------------")
    }
}).listen(lis_port);
console.log("server is listening on " + lis_port);
