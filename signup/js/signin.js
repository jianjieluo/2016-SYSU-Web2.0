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
        var register_info = JSON.parse(getRegisterInfo(req));
        console.log("register_info type is :" + typeof register_info)
    }

    switch (url_parts.pathname) {
        case '/':
            display_signup(signup_html_path, req, res);
            break;
        case '/?username=abc':
            var search_username = qs.parse(url_parts.query).username;
            display_info(req, res, search_username);
            break;
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
    function display_signup(url, req, res) {
        console.log('enter the display_signup function')
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        // var members_info = dataHelper.readUserData(data_path);
        // var members_info = require(data_path);
        // console.log("the type of members info " + typeof members_info);
        // console.log(JSON.stringify(members_info))

        var html = dataHelper.readHtml(url);
        // the html is right here
        // console.log(html.toString());
        res.end(html);
        console.log('leave the current funcions');
        console.log('----------------------------')
    }

    function display_register_feedback(req, res, user_info) {
        console.log('enter the display_register_feedback function')
            // read the members
        var members_info = require(data_path);
        var conflict_info;
        var isconflict = false;

        for (var i = 0, len = members_info.length; i < len; ++i) {
            if (user_info['userName'] == members_info['members'][i]['userName']) {
                conflict_info = 'userName';
                isconflict = true;
            }
            if (user_info['userId'] == members_info['members'][i]['userId']) {
                conflict_info = 'userId';
                isconflict = true;
            }
            if (user_info['phoneNum'] == members_info['members'][i]['phoneNum']) {
                conflict_info = 'phoneNum';
                isconflict = true;
            }
            if (user_info['email'] == members_info['members'][i]['email']) {
                conflict_info = 'email';
                isconflict = true;
            }
        }

        if (isconflict) {
            console.log('register failed with conflict')
            display_conflict(req, res, conflict_info);
        } else {
            console.log('register successfully')
            members_info['members'].push(user_info);
            dataHelper.writeUserData(members_info);
            display_info(req, res, user_info['userName']);
        }
    }

    function display_conflict(req, res, conflict_info) {
        console.log('enter the display_conflict function')
        var html = dataHelper.readHtml(register_fail_html_path);
        html.replace("{\$(conflict_info)}", "information conflict with database on " + conflict_info);

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        console.log('leave the current funcions')
        res.end(html);
    }

    function display_info(res, req, search_username) {
        var members_info = require(data_path);
        for (var i = 0, len = members_info.length; i < len; ++i) {
            if (search_username == members_info['members'][i]['userName']) {
                var html = dataHelper.readHtml(info_html_path);
                html.replace("{\$(userName)}", members_info['members'][i]['userName'])
                html.replace("{\$(userId)}", members_info['members'][i]['userId'])
                html.replace("{\$(phoneNum)}", members_info['members'][i]['phoneNum'])
                html.replace("{\$(email)}", members_info['members'][i]['email'])

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(html);
                console.log('leave the current funcions')
                break;
            }
        }
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
    }

    function sendJsFile(url) {
        var js = dataHelper.readCode(url);
        res.writeHead(200, {
            'Content-Type': 'text/javascript'
        });
        res.end(js);
    }
}).listen(lis_port);
console.log("server is listening on " + lis_port);
