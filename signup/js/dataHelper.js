// 这个js是在服务端中封装一次fs，然后用来读html，css，js的
// 写完后才发现两个函数可以合并，由于涉及修改的地方较多，所以不改了，而且也提高了可读性
var fs = require('fs')

function readCode(code_path) {
    var code = fs.readFileSync(code_path);
    return code;
}

function readHtml(html_path) {
    var html = fs.readFileSync(html_path)
    return html;
}


exports.readCode = readCode;
exports.readHtml = readHtml;
