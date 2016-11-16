var fs = require('fs')

function readCode(code_path) {
    var code = fs.readFileSync(code_path);
    return code;
}

function writeUserData(data_path, user_info) {
    var membersInfo = require(data_path)
    membersInfo["members"].push(user_info)
    fs.writeFile(data_path, JSON.stringify(membersInfo), 'utf8')
}

function readHtml(html_path) {
    var html = fs.readFileSync(html_path)
    return html;
}


exports.readCode = readCode;
exports.writeUserData = writeUserData;
exports.readHtml = readHtml;
