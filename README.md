# Simple meteor example with socket.io

Using meteor 1.3.4.1

## Install npm packages

In your meteor project:

    meteor npm install --save-dev meteor-node-stubs socket.io socket.io-client

## Server

In your server, use the 'socket.io' package:

```javascript
import http from 'http';
import socket_io from 'socket.io';

const PORT = 8080;

Meteor.startup(() => {
  // Server
  const server = http.createServer();
  const io = socket_io(server);

  let counter = 0;

  // New client
  io.on('connection', function(socket) {
    console.log('new socket client');
  });

  // Start server
  try {
    server.listen(PORT);
  } catch (e) {
    console.error(e);
  }
});
```

## Client

In your client, use the 'socket.io-client' package:

```javascript
// Hack https://github.com/socketio/socket.io-client/issues/961
import Response from 'meteor-node-stubs/node_modules/http-browserify/lib/response';
if (!Response.prototype.setEncoding) {
  Response.prototype.setEncoding = function(encoding) {
    // do nothing
  }
}

// Socket io client
const PORT = 8080;
let socket = require('socket.io-client')(`http://localhost:${PORT}`);

socket.on('connect', function() {
  console.log('Client connected');
});
socket.on('disconnect', function() {
  console.log('Client disconnected');
});
```
