var http = require('http')
var qs = require('querystring')

var server = http.createServer(function(request, response) {


    console.log(request.url)
})


var lis_port = 8000
server.listen(lis_port)
console.log("server is listening on " + lis_port)
