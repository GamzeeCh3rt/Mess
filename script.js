// простой мессенджер в стиле Arch/KDE
// данные хранятся в localStorage

let state = {
    user: { name: "пользователь" },
    chats: [],      // { id, name, messages: [{ text, fromMe, time }] }
    activeChatId: null,
    nextId: 1
};

// DOM элементы
const chatListDiv = document.getElementById('chatList');
const messagesArea = document.getElementById('messagesArea');
const inputArea = document.getElementById('inputArea');
const currentChatNameSpan = document.getElementById('currentChatName');
const myNameDisplay = document.getElementById('myNameDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const newChatBtn = document.getElementById('newChatBtn');
const newChatModal = document.getElementById('newChatModal');
const createNewChat = document.getElementById('createNewChat');
const cancelNewChat = document.getElementById('cancelNewChat');
const newChatNameInput = document.getElementById('newChatName');
const settingsModal = document.getElementById('settingsModal');
const openSettingsBtn = document.getElementById('openSettingsBtn');
const closeSettings = document.getElementById('closeSettings');
const userNameInput = document.getElementById('userNameInput');
const resetDataBtn = document.getElementById('resetDataBtn');

// загрузка/сохранение
function loadData() {
    const saved = localStorage.getItem('kdeterm_messenger');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state = parsed;
            if (!state.nextId) state.nextId = 1;
            if (!state.chats) state.chats = [];
            if (!state.user) state.user = { name: "пользователь" };
        } catch(e) { console.warn(e); }
    } else {
        // демо-чат для примера
        state.chats = [
            { id: state.nextId++, name: "archlinux", messages: [
                { text: "привет, как настроил окружение?", fromMe: false, time: Date.now() - 3600000 }
            ] },
            { id: state.nextId++, name: "kde", messages: [
                { text: "plasma 6 вышел", fromMe: true, time: Date.now() - 7200000 }
            ] }
        ];
        state.activeChatId = state.chats[0].id;
        state.user = { name: "пользователь" };
    }
    if (!state.user.name) state.user.name = "пользователь";
    render();
    saveData();
}

function saveData() {
    localStorage.setItem('kdeterm_messenger', JSON.stringify(state));
}

// рендер сайдбара
function renderChatList() {
    if (!chatListDiv) return;
    if (state.chats.length === 0) {
        chatListDiv.innerHTML = '<div style="padding: 12px; color: #6c7086;">нет диалогов</div>';
        return;
    }
    chatListDiv.innerHTML = state.chats.map(chat => {
        const lastMsg = chat.messages.length ? chat.messages[chat.messages.length-1].text : "нет сообщений";
        const shortLast = lastMsg.length > 40 ? lastMsg.slice(0,40)+"..." : lastMsg;
        const activeClass = (state.activeChatId === chat.id) ? 'active' : '';
        return `
            <div class="chat-item ${activeClass}" data-chat-id="${chat.id}">
                <div class="chat-name">${escapeHtml(chat.name)}</div>
                <div class="chat-last">${escapeHtml(shortLast)}</div>
            </div>
        `;
    }).join('');
    document.querySelectorAll('.chat-item').forEach(el => {
        el.addEventListener('click', () => {
            const id = parseInt(el.dataset.chatId);
            if (id) setActiveChat(id);
        });
    });
}

function renderMessages() {
    if (!messagesArea) return;
    const activeChat = state.chats.find(c => c.id === state.activeChatId);
    if (!activeChat) {
        messagesArea.innerHTML = '<div class="empty-state">~ выберите чат</div>';
        inputArea.style.display = 'none';
        currentChatNameSpan.innerText = 'выберите чат';
        return;
    }
    currentChatNameSpan.innerText = activeChat.name;
    inputArea.style.display = 'flex';
    if (activeChat.messages.length === 0) {
        messagesArea.innerHTML = '<div class="empty-state">~ сообщений нет, напишите что-нибудь</div>';
        return;
    }
    messagesArea.innerHTML = activeChat.messages.map(msg => {
        const isMine = msg.fromMe;
        const timeStr = new Date(msg.time).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        return `
            <div class="message ${isMine ? 'message-mine' : 'message-them'}">
                <div class="message-sender">${isMine ? state.user.name : activeChat.name}</div>
                <div class="message-bubble">${escapeHtml(msg.text)}</div>
                <div class="message-time">${timeStr}</div>
            </div>
        `;
    }).join('');
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function setActiveChat(chatId) {
    state.activeChatId = chatId;
    renderChatList();
    renderMessages();
    saveData();
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;
    const activeChat = state.chats.find(c => c.id === state.activeChatId);
    if (!activeChat) return;
    activeChat.messages.push({
        text: text,
        fromMe: true,
        time: Date.now()
    });
    messageInput.value = '';
    renderMessages();
    renderChatList(); // обновить последнее сообщение
    saveData();
    // автоответ (для имитации собеседника) — чисто для вайба
    setTimeout(() => {
        const stillActive = state.activeChatId === activeChat.id;
        if (stillActive) {
            const replies = ["понял", "ок", "и тебе привет", "лады", "ясно", "хорошо"];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            activeChat.messages.push({
                text: randomReply,
                fromMe: false,
                time: Date.now()
            });
            renderMessages();
            renderChatList();
            saveData();
        }
    }, 1200);
}

function createNewChat() {
    const name = newChatNameInput.value.trim();
    if (!name) return;
    const exists = state.chats.some(c => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        alert("чат с таким именем уже есть");
        return;
    }
    const newId = state.nextId++;
    state.chats.push({
        id: newId,
        name: name,
        messages: []
    });
    state.activeChatId = newId;
    newChatNameInput.value = '';
    newChatModal.style.display = 'none';
    renderChatList();
    renderMessages();
    saveData();
}

function openNewChatModal() {
    newChatModal.style.display = 'flex';
    newChatNameInput.focus();
}

function closeNewChatModal() {
    newChatModal.style.display = 'none';
    newChatNameInput.value = '';
}

function openSettings() {
    userNameInput.value = state.user.name;
    settingsModal.style.display = 'flex';
}

function closeSettingsModal() {
    settingsModal.style.display = 'none';
    const newName = userNameInput.value.trim();
    if (newName && newName !== state.user.name) {
        state.user.name = newName;
        myNameDisplay.innerText = state.user.name;
        renderMessages(); // обновить имена в сообщениях
        saveData();
    }
}

function resetAllData() {
    if (confirm("сбросить все диалоги и настройки? данные нельзя будет восстановить")) {
        localStorage.removeItem('kdeterm_messenger');
        state = {
            user: { name: "пользователь" },
            chats: [],
            activeChatId: null,
            nextId: 1
        };
        // демо-чат для затравки
        state.chats.push({ id: state.nextId++, name: "archlinux", messages: [] });
        state.activeChatId = state.chats[0].id;
        state.user = { name: "пользователь" };
        saveData();
        renderChatList();
        renderMessages();
        myNameDisplay.innerText = state.user.name;
    }
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
        return c;
    });
}

// инициализация событий
function initEvents() {
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    newChatBtn.addEventListener('click', openNewChatModal);
    cancelNewChat.addEventListener('click', closeNewChatModal);
    createNewChat.addEventListener('click', createNewChat);
    openSettingsBtn.addEventListener('click', openSettings);
    closeSettings.addEventListener('click', closeSettingsModal);
    resetDataBtn.addEventListener('click', resetAllData);
    // закрыть модалки по клику вне
    window.addEventListener('click', (e) => {
        if (e.target === newChatModal) closeNewChatModal();
        if (e.target === settingsModal) closeSettingsModal();
    });
}

// старт
function init() {
    loadData();
    initEvents();
    myNameDisplay.innerText = state.user.name;
}

init();
