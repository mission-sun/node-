const http = require("http");
const serverHandler = require('../app');

const server = http.createServer((req, res) => {
  serverHandler(req, res);
});
const port = 8000;
hostName = '127.0.0.1';
server.listen(port, hostName, () => {
  console.log('server running at ' + hostName + ':' + port);
});
