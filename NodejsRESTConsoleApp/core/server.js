var http = require("http");
var emp = require("../controller/employee");
var settings = require("../settings");
var httMsgs = require("../core/httpMsg");

http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                req.end();
            }
            else if (req.url === "/employee") {
                emp.getList(req, resp);
            }
            break;
        case "POST":
            break;
        case "PUT":
            break;
        case "DELETE":
            break;
        default :
            httMsgs.show405(req, resp);
            break;
    }

    //console.log("Started listening at: 9000");

}).listen(settings.webPort, function () {
    console.log("Started listening at: "+ settings.webPort);
});