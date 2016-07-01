import { Meteor } from 'meteor/meteor';

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
    socket.emit('counter', counter);

    // Counter update from client
    socket.on('counter', (value) => {
      console.log(`counter changed on client: ${value}`);
      if (counter !== value) {
        io.emit('counter', counter = value);
      }
    });
  });

  // Start server
  try {
    server.listen(PORT);
  } catch (e) {
    console.error(e);
  }
});
