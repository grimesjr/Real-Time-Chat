const io = require('socket.io')(3000)

const users = {};

//when someone connects to socket
io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  })
  socket.on('send-chat-message', message => {
    //sends down to all other connected clients other than sender
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
  })
})

