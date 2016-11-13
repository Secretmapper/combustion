var http = require('http');
var connect = require('connect');
var proxy = require('http-proxy-middleware');

var rpcProxy = proxy('/transmission/rpc', {
  target: 'http://127.0.0.1:9091',
  changeOrigin: true
});

var webpackProxy = proxy('/', {
  target: 'http://127.0.0.1:3000',
  changeOrigin: true,
  ws: true
});


var app = connect();

app.use(rpcProxy);
app.use(webpackProxy);

http.createServer(app).listen(8000);
