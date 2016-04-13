//https://nodejs.org/api/net.html
//https://packetsender.com/
//%j jason
//%s string

var readlineSyne = require("readline-sync");
var colors = require("colors");
var net = require("net");

var HOST = "127.0.0.1";
var PORT = 8080;


var client = null;

function OpenConnection(){
    if (client) {
        console.log("-- Connection is already open --".red);
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }

    client = new net.Socket();
    
    client.on("error", function (err) {
        client.destroy();
        client = null;
        console.log("ERROR : Connection could not be opened. Msg : %".red, err.message);
    });
    
    //received information from server back
    client.on("data", function (data) {        
        console.log("Received : %".cyan, data);
        setTimeout(function () {
            menu();
        }, 0);

    });

    client.connect(PORT, HOST, function () {
        console.log("Connection opened successfully".green);
        setTimeout(function () {
            menu();
        }, 0);
    });

}

function SendData(data){
    if (!client) {
        console.log("Connection is not opened or closed".red);
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }

    client.write(data);
     
}
function CloseConnection() {
    if (!client) { 

        console.log("Connection is not opened or alread closed".red);
        setTimeout(function () {
            menu();
        }, 0);
        return;
    };

    client.destroy();
    client = null;

    console.log("Connection closed successfully".yellow);

    setTimeout(function () {
        menu();
    }, 0);
     

}


function menu() { 

    var lineRead = readlineSyne.question("\n\nEnter option (1 - Open, 2 - Send, 3 - Close, 4 - Quit): ");
    switch (lineRead) {

        case "1":
            OpenConnection();
            console.log("Option 1 selected");
            break;

        case "2":
            var data = readlineSyne.question("Enter data to send : ");
            SendData(data);
            console.log("Option 2 selected");
            break;

        case "3":
            CloseConnection();
            console.log("Option 3 selected");
            break;

        case "4":
            console.log("Option 4 selected");
            return;           
            break;

        default :
            setTimeout(function () {
                menu();
            }, 0);

            menu();
            break; 
    }
}

setTimeout(function () {
    menu();
}, 0);