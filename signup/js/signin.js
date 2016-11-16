var http = require('http');
var url = require('url');
var qs = require('querystring')
var fs = require('fs')
var dataHelper = require('./dataHelper.js');

var data_path = '../data/test_data.json'
var info_html_path = '../html/info.html'
var signup_html_path = '../html/signup.html'
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
            // post 请求时，就应该是开始注册了
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
                    // 查询用户详情
                    display_info(req, res, search_username);
                } else {
                    // 显示默认的signup界面
                    display_signup(signup_html_path, req, res);
                }
            }
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
    /**
     * response with the default signup html
     */
    function display_signup(url, req, res) {
        console.log('enter the display_signup function');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        var html = dataHelper.readHtml(url);

        res.end(html);
        console.log('-----------------end display_signup()--------------------')
    }

    /**
     * 返回注册反馈，在里面进行数据重复检测，然后分有两种可能
     */
    function display_register_feedback(req, res, user_info) {
        console.log('enter the display_register_feedback function')
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

        // 如果可以进入到这一步，说明前面的重复检查通过了
        console.log('register successfully');
        var register_info = {};
        register_info["userName"] = user_info.userName;
        register_info["userId"] = user_info.userId;
        register_info['phoneNum'] = user_info.phoneNum;
        register_info['email'] = user_info.email;

        members_info.members.push(register_info);

        fs.writeFileSync(data_path, JSON.stringify(members_info), 'utf8');
        console.log('add the new user info successfully')
        display_info(req, res, user_info.userName);
    }


    // 从模板 signin.html 里面填充冲突信息然后返回
    function display_conflict(req, res, conflict_info) {
        console.log('enter the display_conflict function')
        var data = dataHelper.readHtml(signup_html_path);
        var html = data.toString();
        html = html.replace("<p class=\"conflictInfo\"></p>", "<p class=\"conflictInfo\">information conflict with database on :" + conflict_info + "</p>");

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(html);
        console.log('-----------------------leave the display_conflict()---------------------------')
    }


    //在这里展示用户信息，如果数据库中没有这个用户名，则返回default的signup.html
    function display_info(req, res, search_username) {
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
        return;
    }

    function display_404(url, req, res) {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.write("<h1 > 404 Not Found < /h1>");
        res.end("The page you were looking for: " + url + " an not be found ");
        console.log("-----------------404 error occurs--------------------")
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
