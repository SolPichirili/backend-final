const socket = io.connect();

const chat = document.querySelector('#chat');

chat.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = new Date().toLocaleString();
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;
    const lastname = document.querySelector('#lastname').value;
    const text = document.querySelector('#message').value;

    socket.emit('new-message', { date, email, name, lastname, text });

    document.querySelector('#message').value = "";
});

const showMessages = (messages) => {
    const html = messages.map((m) => {
        return (`<p>${m.email}:</p>
                <p>${m.date}:</p>
                <p>${m.name}:</p>
                <p>${m.lastname}</p>
                <p>${m.text}</p>`);
    }).join(' ');

    document.querySelector('#savedMessage').innerHTML = html;
};

socket.on('messages', data => {
    showMessages(data);
});