<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Violet Messenger</title>

  <!-- iOS Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <div class="app">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <!-- TOP -->
      <div class="sidebar-top">
        <div class="profile-preview">
          <div class="avatar large"></div>

          <div class="profile-info">
            <h2>Daniel</h2>
            <span>online</span>
          </div>
        </div>

        <button class="icon-btn">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19" stroke-width="2" stroke-linecap="round"/>
            <path d="M5 12H19" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- SEARCH -->
      <div class="search-box">
        <input type="text" placeholder="Search" />
      </div>

      <!-- CHAT LIST -->
      <div class="chat-list">

        <div class="chat-item active">
          <div class="avatar purple"></div>

          <div class="chat-content">
            <div class="chat-top-row">
              <h3>Max</h3>
              <span>13:37</span>
            </div>

            <div class="chat-bottom-row">
              <p>Send the design files</p>
              <div class="unread-count">2</div>
            </div>
          </div>
        </div>

        <div class="chat-item">
          <div class="avatar"></div>

          <div class="chat-content">
            <div class="chat-top-row">
              <h3>Alex</h3>
              <span>11:20</span>
            </div>

            <div class="chat-bottom-row">
              <p>Photo received</p>
            </div>
          </div>
        </div>

        <div class="chat-item">
          <div class="avatar"></div>

          <div class="chat-content">
            <div class="chat-top-row">
              <h3>Group Chat</h3>
              <span>Yesterday</span>
            </div>

            <div class="chat-bottom-row">
              <p>3 new messages</p>
            </div>
          </div>
        </div>

      </div>

      <!-- IOS SETTINGS STYLE -->
      <div class="settings-panel">

        <div class="settings-header">
          <h2>Settings</h2>
        </div>

        <div class="settings-group">

          <div class="settings-profile-card">
            <div class="avatar huge"></div>

            <div class="settings-profile-info">
              <h3>Daniel Frost</h3>
              <p>@daniel</p>
            </div>
          </div>

        </div>

        <div class="settings-group">

          <button class="settings-item">
            <div class="settings-left">
              <div class="settings-icon purple-bg"></div>
              <span>Saved Messages</span>
            </div>

            <div class="settings-arrow"></div>
          </button>

          <button class="settings-item">
            <div class="settings-left">
              <div class="settings-icon blue-bg"></div>
              <span>Recent Calls</span>
            </div>

            <div class="settings-arrow"></div>
          </button>

          <button class="settings-item">
            <div class="settings-left">
              <div class="settings-icon green-bg"></div>
              <span>Devices</span>
            </div>

            <div class="settings-arrow"></div>
          </button>

        </div>

        <div class="settings-group">

          <button class="settings-item">
            <div class="settings-left">
              <div class="settings-icon gray-bg"></div>
              <span>Appearance</span>
            </div>

            <div class="settings-arrow"></div>
          </button>

          <button class="settings-item">
            <div class="settings-left">
              <div class="settings-icon orange-bg"></div>
              <span>Notifications</span>
            </div>

            <div class="settings-arrow"></div>
          </button>

          <button class="settings-item">
            <div class="settings-left">
              <div class="settings-icon red-bg"></div>
              <span>Privacy & Security</span>
            </div>

            <div class="settings-arrow"></div>
          </button>

        </div>

      </div>

    </aside>

    <!-- CHAT AREA -->
    <main class="chat-area">

      <!-- CHAT HEADER -->
      <header class="chat-header">

        <div class="chat-user">
          <div class="avatar"></div>

          <div>
            <h2>Max</h2>
            <span>online</span>
          </div>
        </div>

        <div class="chat-actions">
          <button class="icon-btn"></button>
          <button class="icon-btn"></button>
        </div>

      </header>

      <!-- MESSAGES -->
      <section class="messages-area">

        <div class="message incoming">
          <div class="message-bubble">
            yo
          </div>
        </div>

        <div class="message outgoing">
          <div class="message-bubble">
            send assets pls
          </div>
        </div>

        <div class="message incoming image-message">
          <div class="message-bubble image-bubble">
            <img src="https://picsum.photos/300/220" alt="image" />
          </div>
        </div>

      </section>

      <!-- INPUT -->
      <footer class="chat-input-area">

        <button class="attach-btn">
          +
        </button>

        <div class="message-input-wrapper">
          <input type="text" placeholder="Message" />
        </div>

        <label class="image-upload-btn">
          <input type="file" hidden accept="image/*" />
        </label>

        <button class="send-btn">
          ➜
        </button>

      </footer>

    </main>

  </div>

  <!-- MOBILE NAVBAR -->
  <nav class="mobile-navbar">

    <button class="mobile-nav-item active">
      <span>Chats</span>
    </button>

    <button class="mobile-nav-item">
      <span>Settings</span>
    </button>

  </nav>

  <!-- Scripts -->
  <script src="app.js"></script>
  <script src="app.js"></script>
</body>
</html>

<!-- ========================= -->
<!-- APP.JS -->
<!-- ========================= -->

<script>
const chatItems = document.querySelectorAll('.chat-item');
const messageArea = document.querySelector('.messages');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-btn');
const imageUpload = document.querySelector('#imageUpload');
const currentChatName = document.querySelector('.current-chat-name');
const mobileTabs = document.querySelectorAll('.mobile-tab');
const screens = document.querySelectorAll('.screen');

let currentChat = 'Alex';

const chats = {
  Alex: [],
  Design: [],
  Team: []
};

function createMessage(text, type = 'outgoing', image = null) {
  const message = document.createElement('div');
  message.className = `message ${type}`;

  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.className = 'message-image';
    message.appendChild(img);

    setTimeout(() => {
      img.remove();
    }, 1000 * 60 * 10);
  }

  if (text.trim()) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    message.appendChild(bubble);
  }

  messageArea.appendChild(message);
  messageArea.scrollTop = messageArea.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) return;

  createMessage(text, 'outgoing');

  chats[currentChat].push({
    text,
    type: 'outgoing'
  });

  messageInput.value = '';

  setTimeout(() => {
    createMessage('Окей.', 'incoming');
  }, 1200);
}

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(event) {
    createMessage('', 'outgoing', event.target.result);

    chats[currentChat].push({
      image: event.target.result,
      type: 'outgoing'
    });
  };

  reader.readAsDataURL(file);
});

chatItems.forEach(chat => {
  chat.addEventListener('click', () => {
    chatItems.forEach(c => c.classList.remove('active'));
    chat.classList.add('active');

    currentChat = chat.dataset.chat;

    if (currentChatName) {
      currentChatName.textContent = currentChat;
    }

    messageArea.innerHTML = '';

    chats[currentChat].forEach(msg => {
      createMessage(msg.text || '', msg.type, msg.image || null);
    });
  });
});

mobileTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.screen;

    mobileTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    screens.forEach(screen => {
      screen.classList.remove('active-screen');
    });

    document.querySelector(`#${target}`)?.classList.add('active-screen');
  });
});

function saveLocal() {
  localStorage.setItem('violetChats', JSON.stringify(chats));
}

function loadLocal() {
  const saved = localStorage.getItem('violetChats');

  if (saved) {
    Object.assign(chats, JSON.parse(saved));
  }
}

setInterval(saveLocal, 3000);

loadLocal();

setTimeout(() => {
  createMessage('Добро пожаловать в Violet.', 'incoming');
}, 500);
</script>

<!-- ========================= -->
<!-- STYLE.CSS -->
<!-- ========================= -->

/*
==============================
  IOS 16 TELEGRAM STYLE
==============================
*/

:root {
  --bg: #000000;
  --bg-secondary: #111111;
  --bg-card: #1c1c1e;
  --bg-card-2: #2c2c2e;
  --line: rgba(255,255,255,0.06);
  --text: #ffffff;
  --text-secondary: #98989f;
  --violet: #7c4dff;
  --violet-light: #9d7dff;
  --green: #30d158;
  --red: #ff453a;
  --blur: blur(20px);
  --radius: 18px;
  --shadow: 0 10px 40px rgba(0,0,0,.45);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background:
    radial-gradient(circle at top left, rgba(124,77,255,.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(124,77,255,.12), transparent 30%),
    #000;
}

.app {
  width: 100%;
  height: 100vh;
  display: flex;
  background: var(--bg);
  overflow: hidden;
}

/* ==============================
   SIDEBAR
================================ */

.sidebar {
  width: 370px;
  min-width: 370px;
  background: rgba(18,18,18,.95);
  backdrop-filter: var(--blur);
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 54px 20px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -.03em;
}

.new-chat-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: rgba(124,77,255,.18);
  color: var(--violet-light);
  font-size: 22px;
  cursor: pointer;
  transition: .2s;
}

.new-chat-btn:hover {
  transform: scale(1.06);
  background: rgba(124,77,255,.25);
}

.search-box {
  padding: 0 16px 14px;
}

.search-box input {
  width: 100%;
  height: 42px;
  border: none;
  outline: none;
  border-radius: 14px;
  padding: 0 16px;
  background: var(--bg-card);
  color: var(--text);
  font-size: 15px;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 120px;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  cursor: pointer;
  transition: .18s;
}

.chat-item:hover {
  background: rgba(255,255,255,.03);
}

.chat-item.active {
  background: rgba(124,77,255,.18);
}

.avatar {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
}

.chat-info {
  flex: 1;
  overflow: hidden;
}

.chat-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.chat-name {
  font-size: 16px;
  font-weight: 600;
}

.chat-time {
  font-size: 12px;
  color: var(--text-secondary);
}

.chat-preview {
  font-size: 14px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ==============================
   CHAT AREA
================================ */

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #000;
  position: relative;
}

.chat-header {
  height: 92px;
  padding: 44px 24px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  background: rgba(10,10,10,.8);
  backdrop-filter: blur(30px);
}

.chat-user {
  display: flex;
  align-items: center;
  gap: 14px;
}

.chat-user h2 {
  font-size: 18px;
  margin-bottom: 2px;
}

.chat-user span {
  color: var(--green);
  font-size: 13px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.header-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--bg-card);
  color: var(--violet-light);
  font-size: 18px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px 18px 120px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.message {
  max-width: 75%;
  padding: 12px 14px;
  border-radius: 22px;
  font-size: 15px;
  line-height: 1.4;
  position: relative;
  word-break: break-word;
}

.message.incoming {
  background: var(--bg-card);
  border-bottom-left-radius: 8px;
  align-self: flex-start;
}

.message.outgoing {
  background: var(--violet);
  border-bottom-right-radius: 8px;
  align-self: flex-end;
}

.message-time {
  font-size: 11px;
  opacity: .65;
  margin-top: 6px;
  text-align: right;
}

.message-image {
  width: 100%;
  border-radius: 16px;
  margin-top: 8px;
}

/* ==============================
   INPUT AREA
================================ */

.chat-input-area {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 14px 18px 34px;
  background: linear-gradient(to top, #000, transparent);
}

.chat-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(28,28,30,.9);
  backdrop-filter: blur(30px);
  border-radius: 28px;
  padding: 10px 14px;
}

.chat-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 15px;
}

.icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--violet-light);
  font-size: 20px;
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--violet);
  color: white;
  font-size: 18px;
}

/* ==============================
   SETTINGS IOS16 STYLE
================================ */

.settings-page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #000;
  padding-bottom: 120px;
}

.settings-header {
  padding: 60px 22px 24px;
}

.settings-header h1 {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -.03em;
}

.profile-card {
  margin: 0 16px 24px;
  background: var(--bg-card);
  border-radius: 24px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 18px;
}

.profile-avatar {
  width: 82px;
  height: 82px;
  border-radius: 50%;
}

.profile-info h2 {
  font-size: 24px;
  margin-bottom: 4px;
}

.profile-info p {
  color: var(--text-secondary);
  font-size: 15px;
}

.settings-group {
  margin: 0 16px 26px;
}

.settings-label {
  color: var(--text-secondary);
  font-size: 13px;
  text-transform: uppercase;
  margin: 0 8px 10px;
  font-weight: 600;
}

.settings-list {
  background: var(--bg-card);
  border-radius: 18px;
  overflow: hidden;
}

.settings-item {
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border-bottom: 1px solid var(--line);
}

.settings-item:last-child {
  border-bottom: none;
}

.settings-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.settings-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--violet);
  color: white;
  font-size: 15px;
}

.settings-arrow {
  color: #666;
  font-size: 16px;
}

/* ==============================
   IOS BOTTOM BAR
================================ */

.bottom-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88px;
  background: rgba(10,10,10,.85);
  backdrop-filter: blur(40px);
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 22px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-secondary);
}

.nav-item.active {
  color: var(--violet-light);
}

.nav-icon {
  font-size: 22px;
}

/* ==============================
   SCROLLBAR
================================ */

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,.12);
  border-radius: 20px;
}

/* ==============================
   MOBILE
================================ */

@media (max-width: 900px) {
  .sidebar {
    width: 100%;
    min-width: 100%;
  }

  .chat-area {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 20;
    display: none;
  }

  .chat-area.active {
    display: flex;
  }

  .message {
    max-width: 86%;
  }
}

/* ==============================
   DESKTOP POLISH
================================ */

@media (min-width: 1400px) {
  .app {
    width: 95%;
    height: 95vh;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: var(--shadow);
  }
}

