function sendMessage() {
    var inputField = document.getElementById("messageInput");
    var messageText = inputField.value.trim();

    if (messageText === "") {
        return;
    }

    var messagesContainer = document.getElementById("messages");

    var newMessage = document.createElement("div");
    newMessage.classList.add("message", "sent");

    var messageContent = document.createElement("p");
    messageContent.textContent = messageText;

    var messageTime = document.createElement("span");
    messageTime.classList.add("time");
    messageTime.textContent = new Date().toLocaleTimeString().slice(0, 5);

    newMessage.appendChild(messageContent);
    newMessage.appendChild(messageTime);

    messagesContainer.appendChild(newMessage);

    saveMessageToLocalStorage("sent", messageText, messageTime.textContent);

    inputField.value = "";

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(function() {
        var typingStatus = document.getElementById("typingStatus");
        typingStatus.innerHTML = "<p>Yozmoqda...</p>";

        setTimeout(function() {
            typingStatus.innerHTML = "Online";

            setTimeout(function() {
                sendResponse();
            }, 1000);
        }, 3000);
    }, 3000);
}

function sendResponse() {
    var messagesContainer = document.getElementById("messages");

    var responses = [
        "Salom! Qanday yordam bera olishim mumkin?",
        "Qandaysiz birodar.",
        "Tushunmadingmi?",
        "Nima kerak birodar",
        "Nima yordam kerak birodar."
    ];

    var randomResponse = responses[Math.floor(Math.random() * responses.length)];

    var newMessage = document.createElement("div");
    newMessage.classList.add("message", "received");

    var messageContent = document.createElement("p");
    messageContent.textContent = randomResponse;

    var messageTime = document.createElement("span");
    messageTime.classList.add("time");
    messageTime.textContent = new Date().toLocaleTimeString().slice(0, 5);

    newMessage.appendChild(messageContent);
    newMessage.appendChild(messageTime);

    messagesContainer.appendChild(newMessage);

    saveMessageToLocalStorage("received", randomResponse, messageTime.textContent);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function saveMessageToLocalStorage(type, message, time) {
    var messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    messages.push({ type: type, message: message, time: time });

    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

window.onload = function() {
    var messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    var messagesContainer = document.getElementById("messages");
    
    messages.forEach(function(msg) {
        var newMessage = document.createElement("div");
        newMessage.classList.add("message", msg.type);

        var messageContent = document.createElement("p");
        messageContent.textContent = msg.message;

        var messageTime = document.createElement("span");
        messageTime.classList.add("time");
        messageTime.textContent = msg.time;

        newMessage.appendChild(messageContent);
        newMessage.appendChild(messageTime);

        messagesContainer.appendChild(newMessage);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};
