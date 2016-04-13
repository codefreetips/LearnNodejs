var settings = require("../settings");

exports.showHome = function (req, resp) {
    if (settings.httpMsgFormat === "HTML") {
        
        resp.writerHead(200, { "Content-Type" : "text/html" })
        resp.write("<html><head><title>Home</title></head><body>Valid endpoints</body></html>");
 
    }
    else {
        
        resp.writerHead(500, "Internal Error occurred", { "Content-Type" : "application/json" })
        resp.write(JSON.stringify(data));
 
    }
    resp.end();
}

exports.show500 = function (req, resp, err){
    if (settings.httpMsgFormat === "HTML") {

        resp.writerHead(500, "Internal Error occurred", { "Content-Type" : "text/html" })
        resp.write("<html><head><title>500</title></head><body>500 Internal Error. Details : " + err + "</body></html>");
 
    }
    else {

        resp.writerHead(500, "Internal Error occurred", { "Content-Type" : "application/json" })
        resp.write(JSON.stringify(data));
 
    }
    resp.end();
}

exports.show405 = function (req, resp, err) {
    if (settings.httpMsgFormat === "HTML") {
        
        resp.writerHead(405, "Method Not Supported", { "Content-Type" : "text/html" })
        resp.write("<html><head><title>405</title></head><body>405 Internal Error. Details : " + err + "</body></html>");
 
    }
    else {
        
        resp.writerHead(405, "Internal Error occurred", { "Content-Type" : "application/json" })
        resp.write(JSON.stringify(data));
 
    }
    resp.end();
}

exports.show404 = function (req, resp, err) {
    if (settings.httpMsgFormat === "HTML") {
        
        resp.writerHead(404, "Page Not Found", { "Content-Type" : "text/html" })
        resp.write("<html><head><title>404</title></head><body>404 Internal Error. Details : " + err + "</body></html>");
 
    }
    else {
        
        resp.writerHead(404, "Internal Error occurred", { "Content-Type" : "application/json" })
        resp.write(JSON.stringify(data));
 
    }
    resp.end();
}

exports.show413 = function (req, resp, err) {
    if (settings.httpMsgFormat === "HTML") {
        
        resp.writerHead(404, "Page Not Found", { "Content-Type" : "text/html" })
        resp.write("<html><head><title>404</title></head><body>404 Internal Error. Details : " + err + "</body></html>");
 
    }
    else {
        
        resp.writerHead(404, "Internal Error occurred", { "Content-Type" : "application/json" })
        resp.write(JSON.stringify(data));
 
    }
    resp.end();
}

exports.send200 = function (req, resp, err) {
    if (settings.httpMsgFormat === "HTML") {
        
        resp.writerHead(200, "OK", { "Content-Type" : "text/html" })
        resp.write("<html><head><title>404</title></head><body>404 Internal Error. Details : " + err + "</body></html>");
 
    }
    else {
        
        resp.writerHead(200, "OK", { "Content-Type" : "application/json" })
        resp.write(JSON.stringify(data));
 
    }
    resp.end();
}


exports.sendJson = function (req, resp, data) {

    resp.writerHead(200, "Internal Error occurred", { "Content-Type" : "application/json" })
    
    if (data) {
        resp.write(JSON.stringify(data));
    }
    resp.end();
}