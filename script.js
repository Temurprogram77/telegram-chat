function sendMessage() {
    var inputField = document.getElementById("messageInput");
    var messageText = inputField.value.trim();

    // Faqat bo'sh xabar yuborilmasin
    if (messageText === "") {
        return;
    }

    var messagesContainer = document.getElementById("messages");

    // Yangi xabarni yaratish
    var newMessage = document.createElement("div");
    newMessage.classList.add("message", "sent");

    // Yangi xabarni qo'shish
    var messageContent = document.createElement("p");
    messageContent.textContent = messageText;

    var messageTime = document.createElement("span");
    messageTime.classList.add("time");
    messageTime.textContent = new Date().toLocaleTimeString().slice(0, 5);  // H:m formatida vaqt

    newMessage.appendChild(messageContent);
    newMessage.appendChild(messageTime);

    // Xabarni ekran bo'ylab qo'shish
    messagesContainer.appendChild(newMessage);

    // Yuborilgan xabarni localStorage'ga saqlash
    saveMessageToLocalStorage("sent", messageText, messageTime.textContent);

    // Yuborilgan xabarni o'chirish
    inputField.value = "";

    // Ekran oxiriga scroll qilish
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // "Yozmoqda..." so'zini ko'rsatish
    setTimeout(function() {
        var typingStatus = document.getElementById("typingStatus");
        typingStatus.innerHTML = "<p>Yozmoqda...</p>"; // "Yozmoqda..." so'zi ko'rsatiladi

        // 3 soniya kutish, so'ngra "Yozmoqda..." o'chib, javob yuborish uchun 1 soniya kutish
        setTimeout(function() {
            typingStatus.innerHTML = "Online"; // "Yozmoqda..." so'zini o'chirish

            // 1 soniya kutib, javob yuborish
            setTimeout(function() {
                sendResponse();
            }, 1000); // 1 soniya kutish
        }, 3000); // 3 soniya kutish, "Yozmoqda..." ko'rsatish
    }, 3000); // 3 soniya kutish, "Yozmoqda..." ko'rsatish
}

function sendResponse() {
    var messagesContainer = document.getElementById("messages");

    // Tasodifiy javoblar
    var responses = [
        "Salom! Qanday yordam bera olishim mumkin?",
        "Hozirda boshqa ish bilan bandman, iltimos kuting.",
        "Nima bo'ldi? Yordam bera olishim mumkin.",
        "Iltimos, sabrli bo'ling, men ko'rib chiqyapman.",
        "Tushunarli, davom eting.",
        "Yaxshi, men buni tekshirib ko'raman.",
        "Siz nega menga yozyapsiz?"
    ];

    // Tasodifiy javobni tanlash
    var randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Yangi javobni yaratish
    var newMessage = document.createElement("div");
    newMessage.classList.add("message", "received");

    var messageContent = document.createElement("p");
    messageContent.textContent = randomResponse;

    var messageTime = document.createElement("span");
    messageTime.classList.add("time");
    messageTime.textContent = new Date().toLocaleTimeString().slice(0, 5);  // H:m formatida vaqt

    newMessage.appendChild(messageContent);
    newMessage.appendChild(messageTime);

    // Xabarni ekran bo'ylab qo'shish
    messagesContainer.appendChild(newMessage);

    // Xabarni localStorage'ga saqlash
    saveMessageToLocalStorage("received", randomResponse, messageTime.textContent);

    // Ekran oxiriga scroll qilish
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// localStorage'ga xabarni saqlash
function saveMessageToLocalStorage(type, message, time) {
    var messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    // Xabarni qo'shish
    messages.push({ type: type, message: message, time: time });

    // localStorage'ga saqlash
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// page load bo'lganda oldingi xabarlarni yuklash
window.onload = function() {
    var messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    var messagesContainer = document.getElementById("messages");
    
    // Har bir xabarni ko'rsatish
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

        // Xabarni ekran bo'ylab qo'shish
        messagesContainer.appendChild(newMessage);
    });

    // Ekran oxiriga scroll qilish
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};
