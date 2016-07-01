import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const counter = new ReactiveVar(0);

Template.hello.helpers({
  counter() {
    return counter.get();
  },
});

Template.hello.events({
  'click button' () {
    // increment the counter when button is clicked
    counter.set(counter.get() + 1);
  },
});

// Socket io

// Hack https://github.com/socketio/socket.io-client/issues/961
import Response from 'meteor-node-stubs/node_modules/http-browserify/lib/response';
if (!Response.prototype.setEncoding) {
  Response.prototype.setEncoding = function(encoding) {
    // do nothing
  }
}

// Connection
const PORT = 8080;
let socket = require('socket.io-client')(`http://localhost:${PORT}`);

socket.on('connect', function() {
  console.log('Client connected');
});
socket.on('disconnect', function() {
  console.log('Client disconnected');
});

// Get counter updates from server
let serverCounter = counter.get();
socket.on('counter', function(value) {
  console.log(`counter changed on server: ${value}`);
  if (serverCounter !== value) {
    serverCounter = value;
    counter.set(value);
  }
});

// Update counter from client to server
Tracker.autorun(() => {
  const c = counter.get();
  if (c !== serverCounter) {
    console.log(c);
    socket.emit('counter', c);
  }
});
