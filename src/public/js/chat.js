const socket = io.connect();

const chat = document.querySelector('#chat');

chat.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.querySelector('#mail').value;
    const name = document.querySelector('#name').value;
    const lastname = document.querySelector('#lastname').value;
    const text = document.querySelector('#message').value;

    socket.emit('new-message', { author: { id, name, lastname }, text });

    document.querySelector('#message').value = "";
});

const showMessages = (messages) => {
    const html = messages.messages.map((m) => {
        return (`<p class="email">${m.author.id}:</p>
                <p class="mensaje">${m.text}</p>`);
    }).join('');

    document.querySelector('#savedMessage').innerHTML = html;
};

socket.on('messages', data => {
    showMessages(data);
});