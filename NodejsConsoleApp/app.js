//%j jason
//%s string
var net = require("net");

var server = net.createServer();

server.on("connection", function (socket) {

    var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;

    console.log("new client connection is made %s" , remoteAddress);

    socket.on("data", function (d) { 
    
        console.log("connection data from %s : %s", remoteAddress, d);

        socket.write("hello " + d);
    });
    

    socket.once("close", function () {
    
        console.log("Connection is closed %s" , remoteAddress);
    });
    

    socket.on("error", function (err) { 

        console.log("Connection %s error %s" , remoteAddress, err.message);
    
    });

});


server.on("error", function (err) {
    
    console.log("some error has occoured");

});


server.listen(8080, function () {
    
    console.log('server is listening to %j', server.address());
});