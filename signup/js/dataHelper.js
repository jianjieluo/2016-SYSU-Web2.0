var fs = require('fs')

function readCode(code_path) {
    var code = fs.readFileSync(code_path);
    return code;
}

function addUserData(data_path, user_info) {
    console.log("begin to add user data to the file")
    console.log(data_path)
    var membersInfo = require(data_path)
    membersInfo["members"].push(user_info)
    console.log("the append user_info is :" + user_info.toString())
    console.log("the membersInfo is :" + membersInfo.toString())
    debugger;
    console.log("JSON.stringify out put " + JSON.stringify(membersInfo))
    fs.writeFileSync(data_path, JSON.stringify(membersInfo), 'utf8');
    // fs.readFile(data_path, 'utf8', function readFileCallback(err, data) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         var obj = JSON.parse(data); //now it an object
    //         obj.members.push(user_info); //add some data
    //         json = JSON.stringify(obj); //convert it back to json
    //         fs.writeFile(data_path, json, 'utf8'); // write it back
    //     }
    // });
}

function readHtml(html_path) {
    var html = fs.readFileSync(html_path)
    return html;
}


exports.readCode = readCode;
exports.addUserData = addUserData;
exports.readHtml = readHtml;
