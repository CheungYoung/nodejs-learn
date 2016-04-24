var http = require('http');

http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];

  request.on('error', function(err) {
    // This prints the error message and stack trace to `stderr`.
    console.error(err.stack);
  });

  var body = [];
  request.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    // at this point, `body` has the entire request body stored in it as a string
  });

  response.statusCode = 200;

  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Powered-By', 'bacon')

  var responseBody = {
     headers: headers,
     method: method,
     url: url,
     body: body
   };

   response.write(JSON.stringify(responseBody));
   response.end();

}).listen(8080); // Activates this server, listening on port 8080.
