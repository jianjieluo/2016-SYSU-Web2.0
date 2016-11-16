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
