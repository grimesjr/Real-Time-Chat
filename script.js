const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');


const name = prompt("what is your name?");
appendMessage("You joined");

socket.emit('new-user', name);

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
  appendMessage(`${name} connected.`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  //sends message to sever
  socket.emit('send-chat-message', message);
  appendMessage(`You: ${message}`);
  //clears out input bar
  messageInput.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}