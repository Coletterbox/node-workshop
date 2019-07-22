var http = require("http");
var fs = require("fs");
var message = "This workshop is weird";

function handler(request, response) {
  var endpoint = request.url;
  console.log(endpoint);
  var method = request.method;
  console.log(method);
  if (endpoint === "/") {
    response.writeHead(200, { "content-type": "text/html" });
    fs.readFile(__dirname + "/public/index.html", function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else if (endpoint == "/node") {
    response.writeHead(200, { "content-type": "text/html" });
    response.write("node");
    response.end();
  } else if (endpoint == "/girls") {
    response.writeHead(200, { "content-type": "text/html" });
    response.write("you are not a girl. get out.");
    response.end();
  } else {
    const extensionType = {
      html: "text/html",
      css: "text/css",
      js: "application/javascript",
      ico: "image/x-icon"
    };
    fs.readFile(__dirname + "/public" + endpoint, function(error, file) {
      if (error) {
        console.log(error);
        return;
      } else {
        var extension = endpoint.split(".")[1];
        response.writeHead(200, { "content-type": extensionType[extension] });
        response.end(file);
      }
    });
  }
}
var server = http.createServer(handler);
server.listen(3000, function() {
  console.log("Server is listening on port 3000.  Ready to accept requests!");
});
