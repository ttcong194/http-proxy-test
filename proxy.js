
const fs = require('fs');
var http = require('http'),
    httpProxy = require('http-proxy');
 
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});
 
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
/*var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://127.0.0.1:3005' });
});
 
console.log("listening on port 5050")
server.listen(5050);
*/

httpProxy.createServer({
  ssl: {
    key: fs.readFileSync('/etc/letsencrypt/live/windstudio.fun/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/windstudio.fun/fullchain.pem', 'utf8')
  },
  target: 'http://localhost:2567',
  secure: true // Depends on your needs, could be false.
}).listen(443);
// Redirect from http port 80 to https
//var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
