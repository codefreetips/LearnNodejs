//https://www.npmjs.com/package/mssql

var sql = require("mssql");

var dbConfig = {
     
    user: "",
    password: "",
    server: "s11.winhost.com",
    database: "",
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
        
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
   
}

function getEmp(){
    var conn = new sql.Connection(dbConfig)
    var req = new sql.Request(conn);
    
    //conn.connect().then(function () { }).catch(function () { });

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query("SELECT * FROM Emp", function (err, recordset) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(recordset);

            }
            conn.close();
        });
    })
}

getEmp();