
const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

const WORKER_URL = "https://flat-night-0a40.krayush1099.workers.dev/";


function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function appendMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');

    const avatarHtml = isUser
        ? `<div class="avatar user-avatar"><img src="user.png" alt="User Avatar" /></div>`
        : `<div class="avatar"><img src="chatbot.png" alt="Bot Avatar" /></div>`;

    const contentHtml = `
        <div class="message-content">
            <p>${text}</p>
            <span class="timestamp">${getCurrentTime()}</span>
        </div>
    `;

    messageDiv.innerHTML = isUser
        ? contentHtml + avatarHtml // User: Content then Avatar
        : avatarHtml + contentHtml; // Bot: Avatar then Content

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


async function getGroqResponse(userMessage) {
  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: userMessage
    })
  });

  if (!response.ok) {
    throw new Error(`Worker Error: ${response.status}`);
  }

  const data = await response.json();
  return data.reply;
}


async function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, true);
    chatInput.value = '';

    // Create a temporary bot message container for loading state
    const loadingMessageId = Date.now();
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'bot');
    messageDiv.innerHTML = `
        <div class="avatar"><img src="chatbot.png" alt="Bot Avatar" /></div>
        <div class="message-content" id="${loadingMessageId}">
            <p>Thinking...</p>
        </div>
    `;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
    const botResponse = await getGroqResponse(text);

    const contentDiv = document.getElementById(loadingMessageId);
    if (contentDiv) {
        // Escape HTML to avoid XSS
        const safeText = botResponse
            ? botResponse
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\n/g, "<br>")
            : "ConsoleChacha blank ho gaya 🤯";

        contentDiv.innerHTML = `
            <p>${safeText}</p>
            <span class="timestamp">${getCurrentTime()}</span>
        `;
    }
} catch (err) {
    const contentDiv = document.getElementById(loadingMessageId);
    if (contentDiv) {
        contentDiv.innerHTML = `
            <p>Server ne mood off kar diya 🚨 Try again.</p>
            <span class="timestamp">${getCurrentTime()}</span>
        `;
    }
    console.error(err);
}

}

sendBtn.addEventListener('click', handleSend);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});
