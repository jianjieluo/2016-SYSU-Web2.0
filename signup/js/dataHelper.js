var fs = require('fs')

function readUserData(data_path) {
    var user_info;
    fs.readFile(data_path, function(err, buffer) {
        if (err) {
            throw err;
        }
        process(buffer)
    });

    function process(buffer) {
        user_info = buffer.toJSON();
    }
    return user_info;
}

function writeUserData(data_path, user_info) {
    var membersInfo = require(data_path)
    membersInfo["members"].push(user_info)
    fs.writeFile(data_path, JSON.stringify(membersInfo), 'utf8')
}

function readHtml(html_path) {
    var html = fs.readFileSync(html_path)
    console.log(html.toString())
    return html;
}


exports.readUserData = readUserData;
exports.writeUserData = writeUserData;
exports.readHtml = readHtml;
