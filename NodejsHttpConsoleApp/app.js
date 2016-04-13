var http = require("http");
var queryString = require("querystring");
var StringBuilder = require("stringbuilder");
var port = 9000;
 
var content = "<html><body>Hello Foo ! <a href='calc'>Click it</a></body></html>";
var content403 = "<html><body>403 Request Entity Too Large !!! <a href='/'>Go Home</a></body></html>";
var content404 = "<html><body>404 !!! <a href='/'>Go Home</a></body></html>";
var content405 = "<html><body>405 !!!<a href='calc'>Click it</a></body></html>";
var contentCalc = "<html><body>contentCalc</body></html>";

function get403(req, resp) {
    
    resp.writeHead(403, "Request Entity Too Large", { "Content-Type": "text/html" });
    resp.write(content403);
    resp.end();//must have
}

function get404(req, resp) {
    
    resp.writeHead(404,"Resource NOT Found", { "Content-Type": "text/html" });
    resp.write(content404);
    resp.end();//must have
}

function get405(req, resp){

    resp.writeHead(405, "Method NOT Found",  { "Content-Type": "text/html" });
    resp.write(content405);
    resp.end();//must have
}

function getHome(req, resp) {
    
    resp.writeHead(200, { "Content-Type": "text/html" });
    resp.write(content);
    resp.end();//must have
}

function getCalcHtml(req, resp ,data) {
    var sb = new StringBuilder({ newline: "\r\n" });
    
    sb.appendLine("<html>");
    sb.appendLine("<body>");
    sb.appendLine("     <form  method ='post'>");
    sb.appendLine("         <table>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>Enter First NO :</td>");
    
    if (data && data.txtFirst) {
        sb.appendLine("                 <td><input type='text' id='txtFirst' name='txtFirst' value='{0}' /></td>", data.txtFirst);
    }
    else {
        sb.appendLine("                 <td><input type='text' id='txtFirst' name='txtFirst' value='' /></td>");
    }
    
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>Enter Second NO :</td>");
    
    if (data && data.txtSecond) {
        sb.appendLine("                 <td><input type='text' id='txtSecond' name='txtSecond' value='{0}' /></td>", data.txtSecond);
    }else {
        sb.appendLine("                 <td><input type='text' id='txtSecond' name='txtSecond' value='' /></td>");
    }
    
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>"); 
    sb.appendLine("                 <td><input type='submit' value='Calculate' /></td><td></td>");
    sb.appendLine("             </tr>");

    if (data && data.txtFirst && data.txtSecond) {
        var sum = parseFloat(data.txtFirst) + parseFloat(data.txtSecond);
        sb.appendLine("             <tr>"); 
        sb.appendLine("                 <td><span>Sum = </span></td></td><td>{0}</td>",sum);
        sb.appendLine("             </tr>");
    }

    sb.appendLine("         </table>");
    sb.appendLine("     </form>");
    sb.appendLine("</body>");
    sb.appendLine("</html>");
    
    sb.build(function (err, result) { 

        resp.write(result);
        resp.end();//must have 
    }); 
}

function getCalcForm(req, resp, formData){
    
    resp.writeHead(200, { "Content-Type": "text/html" });
    getCalcHtml(req, resp, formData);
}

var clientRequestLisener = function (req, resp) {
    
    console.log(req.url);

    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                getHome(req, resp);
            }
            else if (req.url === "/calc") {

                getCalcForm(req, resp);
            }
            else {

                get404(req, resp);
            }
            break;
        case "POST":
            if (req.url === "/calc") {
                
                var reqBody = '';
                req.on('data', function (data) {

                    reqBody += data;
                    
                    if (reqBody.length > 1e7) //10GB
                    {
                        resp.writeHead(200, { "Content-Type": "text/html" });
                        resp.write(result);
                        resp.end();
                    }
                });

                req.on('end', function (data) { 
                    //console.log(reqBody);
                    var formData = queryString.parse(reqBody);
                    getCalcForm(req, resp, formData);

                });
            }
            else {
                
                get404(req, resp);
            }
            break;
        default:
            get405(req, resp);
            break;
    }
     
    //resp.end();//must have
};


//need to be in order
var httpServer = http.createServer(clientRequestLisener);

httpServer.listen(port);