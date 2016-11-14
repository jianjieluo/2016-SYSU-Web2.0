var http = require('http')
    // var user_data = require('../data/data/test_data.json')

var server = http.createServer(function(request, response) {
    // console.log(user_data["members"][0]["userName"])
    console.log(request)
})


var lis_port = 8000
server.listen(lis_port)
console.log("server is listening on " + lis_port)
