var db = require("../core/db");
var httMsgs = require("../core/httpMsg");

exports.getList = function (req, resp) {

    db.executeSql("SELECT * FROM emp", function (data, err) { 

        if (err) { 
            httMsgs.show500(req, resp, err);
        }
        else {
            httMsgs.sendJson(req, resp,data);
        }
       
    });
};

exports.get = function (req, resp, empno) {

    db.executeSql("SELECT * FROM emp WHERE empId =" + empno, function (data, err) { 

    });
};


exports.add = function (req, resp, reqBody) {

};

exports.update = function (req, resp, reqBody) {
    
};

exports.delete = function (req, resp, reqBody) {

};