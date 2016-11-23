var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var port = 3000;

http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("url_parts.pathname is :" + pathname)
    console.log('the request Method is :' + req.method)

    var mimeType = getMimeType(pathname);
    if (!!mimeType) {
        console.log("go to the handle page");
        handlePage(req, res, pathname);
    } else {
        console.log("go to the handle ajax");
        handleAjax(req, res);
    }
}).listen(port, function() {
    console.log('server listen on ', port);
});

function getMimeType(pathname) {
    var validExtensions = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png"
    };
    var ext = path.extname(pathname);
    var type = validExtensions[ext];
    // console.log("path.extname:" + ext);
    // console.log(type)
    return type;
}

function handlePage(req, res, pathname) {
    // console.log("the __dirname is :" + __dirname)
    var filePath = __dirname + pathname;
    var mimeType = getMimeType(pathname);
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, function(err, data) {
            if (err) {
                res.writeHead(500);
                res.end();
            } else {
                res.setHeader("Content-Length", data.length);
                res.setHeader("Content-Type", mimeType);
                res.statusCode = 200;
                res.end(data);
            }
        });
    } else {
        res.writeHead(500);
        console.log("can not fount such a resource");
        res.end();
    }
}

function handleAjax(req, res) {
    var random_time = 1000 + getRandomNumber(2000);
    var random_num = 1 + getRandomNumber(9);
    console.log("random_num is :" + random_num)
    setTimeout(function() {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end("" + random_num);
    }, random_time);
}

var count = 0;

function getRandomNumber(limit) {
    console.log("get a random number" + ++count + "times")
    return Math.round(Math.random() * limit);
}
