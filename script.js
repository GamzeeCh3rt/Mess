import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getFirestore, collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, onSnapshot, addDoc, orderBy } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';

// ЗАМЕНИ НА СВОЙ КОНФИГ ИЗ FIREBASE CONSOLE
const firebaseConfig = {
    apiKey: "AIzaSyAk7KIpPcBUCphtRFza_YumrN2oEN5eoik",
    authDomain: "oleg-131d1.firebaseapp.com",
    projectId: "oleg-131d1",
    storageBucket: "oleg-131d1.firebasestorage.app",
    messagingSenderId: "513374206627",
    appId: "1:513374206627:web:6dba31687022a8a21f5d16"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUser = null;
let currentUserData = null;
let activeChatId = null;
let chatsUnsubscribe = null;
let messagesUnsubscribe = null;

// DOM
const authScreen = document.getElementById('authScreen');
const appScreen = document.getElementById('appScreen');
const myNameDisplay = document.getElementById('myNameDisplay');
const chatListDiv = document.getElementById('chatList');
const messagesArea = document.getElementById('messagesArea');
const inputArea = document.getElementById('inputArea');
const currentChatNameSpan = document.getElementById('currentChatName');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const settingsModal = document.getElementById('settingsModal');
const openSettingsBtn = document.getElementById('openSettingsBtn');
const userNameInput = document.getElementById('userNameInput');
const customCssInput = document.getElementById('customCssInput');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const logoutBtn = document.getElementById('logoutBtn');

// auth
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const regNick = document.getElementById('regNick');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');
const regError = document.getElementById('regError');

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (tab.dataset.tab === 'login') {
            loginForm.style.display = 'flex';
            registerForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'flex';
        }
    });
});

registerBtn.addEventListener('click', async () => {
    const nick = regNick.value.trim();
    const email = regEmail.value.trim();
    const password = regPassword.value;
    if (!nick || !email || !password) {
        regError.innerText = 'заполните все поля';
        return;
    }
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCred.user.uid), {
            nick: nick,
            email: email,
            createdAt: Date.now()
        });
        regError.innerText = '';
        alert('регистрация успешна! теперь войдите');
    } catch (err) {
        regError.innerText = err.message;
    }
});

loginBtn.addEventListener('click', async () => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value;
    if (!email || !password) {
        loginError.innerText = 'заполните поля';
        return;
    }
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        loginError.innerText = err.message;
    }
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, 'users', user.uid), { nick: user.email.split('@')[0], email: user.email, createdAt: Date.now() });
            currentUserData = { nick: user.email.split('@')[0] };
        } else {
            currentUserData = userDoc.data();
        }
        myNameDisplay.innerText = currentUserData.nick;
        userNameInput.value = currentUserData.nick;
        authScreen.style.display = 'none';
        appScreen.style.display = 'flex';
        loadCustomCSS();
        loadChats();
    } else {
        authScreen.style.display = 'flex';
        appScreen.style.display = 'none';
        if (chatsUnsubscribe) chatsUnsubscribe();
        if (messagesUnsubscribe) messagesUnsubscribe();
        activeChatId = null;
    }
});

async function loadChats() {
    if (chatsUnsubscribe) chatsUnsubscribe();
    const q = query(collection(db, 'chats'), where('participants', 'array-contains', currentUser.uid));
    chatsUnsubscribe = onSnapshot(q, async (snapshot) => {
        const chats = [];
        for (const docSnap of snapshot.docs) {
            const chat = { id: docSnap.id, ...docSnap.data() };
            const otherId = chat.participants.find(p => p !== currentUser.uid);
            const otherDoc = await getDoc(doc(db, 'users', otherId));
            chat.otherNick = otherDoc.exists() ? otherDoc.data().nick : otherId;
            chats.push(chat);
        }
        renderChatList(chats);
        if (activeChatId && !chats.find(c => c.id === activeChatId)) {
            activeChatId = null;
            renderMessages([]);
            inputArea.style.display = 'none';
            currentChatNameSpan.innerText = 'выберите чат';
        }
    });
}

function renderChatList(chats) {
    if (!chatListDiv) return;
    if (chats.length === 0) {
        chatListDiv.innerHTML = '<div style="padding: 12px; color: #6c7086;">нет диалогов, найдите пользователя через поиск</div>';
        return;
    }
    chatListDiv.innerHTML = chats.map(chat => {
        const activeClass = (activeChatId === chat.id) ? 'active' : '';
        return `
            <div class="chat-item ${activeClass}" data-chat-id="${chat.id}">
                <div class="chat-name">${escapeHtml(chat.otherNick)}</div>
                <div class="chat-last">${escapeHtml(chat.lastMessage || 'нет сообщений')}</div>
            </div>
        `;
    }).join('');
    document.querySelectorAll('.chat-item').forEach(el => {
        el.addEventListener('click', () => setActiveChat(el.dataset.chatId));
    });
    if (activeChatId && chats.find(c => c.id === activeChatId)) {
        loadMessages(activeChatId);
    }
}

async function setActiveChat(chatId) {
    activeChatId = chatId;
    renderChatList([]);
    await loadMessages(chatId);
    inputArea.style.display = 'flex';
    const chatDoc = await getDoc(doc(db, 'chats', chatId));
    if (chatDoc.exists()) {
        const otherId = chatDoc.data().participants.find(p => p !== currentUser.uid);
        const otherDoc = await getDoc(doc(db, 'users', otherId));
        currentChatNameSpan.innerText = otherDoc.exists() ? otherDoc.data().nick : otherId;
    }
}

async function loadMessages(chatId) {
    if (messagesUnsubscribe) messagesUnsubscribe();
    const q = query(collection(db, 'messages'), where('chatId', '==', chatId), orderBy('timestamp', 'asc'));
    messagesUnsubscribe = onSnapshot(q, (snapshot) => {
        const messages = [];
        snapshot.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
        renderMessages(messages);
    });
}

function renderMessages(messages) {
    if (!messagesArea) return;
    if (!activeChatId) return;
    if (messages.length === 0) {
        messagesArea.innerHTML = '<div class="empty-state">~ сообщений нет, напишите что-нибудь</div>';
        return;
    }
    messagesArea.innerHTML = messages.map(msg => {
        const isMine = msg.senderId === currentUser.uid;
        const senderName = isMine ? currentUserData.nick : msg.senderName || 'собеседник';
        return `
            <div class="message ${isMine ? 'message-mine' : 'message-them'}">
                <div class="message-sender">${escapeHtml(senderName)}</div>
                <div class="message-bubble">${escapeHtml(msg.text)}</div>
                <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
        `;
    }).join('');
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !activeChatId) return;
    await addDoc(collection(db, 'messages'), {
        chatId: activeChatId,
        senderId: currentUser.uid,
        senderName: currentUserData.nick,
        text: text,
        timestamp: Date.now()
    });
    await updateDoc(doc(db, 'chats', activeChatId), { lastMessage: text, lastUpdated: Date.now() });
    messageInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// поиск
searchBtn.addEventListener('click', () => searchModal.style.display = 'flex');
closeSearchBtn.addEventListener('click', () => searchModal.style.display = 'none');
searchInput.addEventListener('input', async () => {
    const q = searchInput.value.trim().toLowerCase();
    if (q.length < 2) {
        searchResults.innerHTML = '';
        return;
    }
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    const users = [];
    snapshot.forEach(doc => {
        if (doc.id !== currentUser.uid && doc.data().nick.toLowerCase().includes(q)) {
            users.push({ id: doc.id, nick: doc.data().nick });
        }
    });
    searchResults.innerHTML = users.map(u => `
        <div class="search-result-item">
            <span>${escapeHtml(u.nick)}</span>
            <button class="start-chat-btn" data-id="${u.id}" data-nick="${u.nick}">начать чат</button>
        </div>
    `).join('');
    document.querySelectorAll('.start-chat-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const otherId = btn.dataset.id;
            const qChat = query(collection(db, 'chats'), where('participants', 'array-contains', currentUser.uid));
            const snap = await getDocs(qChat);
            let existing = null;
            snap.forEach(doc => {
                const parts = doc.data().participants;
                if (parts.includes(otherId) && parts.includes(currentUser.uid)) existing = doc.id;
            });
            if (existing) {
                setActiveChat(existing);
            } else {
                const newChat = await addDoc(collection(db, 'chats'), {
                    participants: [currentUser.uid, otherId],
                    createdAt: Date.now(),
                    lastMessage: ''
                });
                setActiveChat(newChat.id);
            }
            searchModal.style.display = 'none';
            searchInput.value = '';
            searchResults.innerHTML = '';
        });
    });
});

// настройки и CSS
openSettingsBtn.addEventListener('click', () => settingsModal.style.display = 'flex');
closeSettingsBtn.addEventListener('click', () => settingsModal.style.display = 'none');
saveSettingsBtn.addEventListener('click', async () => {
    const newNick = userNameInput.value.trim();
    if (newNick && newNick !== currentUserData.nick) {
        await updateDoc(doc(db, 'users', currentUser.uid), { nick: newNick });
        currentUserData.nick = newNick;
        myNameDisplay.innerText = newNick;
    }
    const customCSS = customCssInput.value;
    localStorage.setItem('kdeterm_custom_css', customCSS);
    applyCustomCSS(customCSS);
    settingsModal.style.display = 'none';
});
logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
});

function loadCustomCSS() {
    const saved = localStorage.getItem('kdeterm_custom_css');
    if (saved) {
        customCssInput.value = saved;
        applyCustomCSS(saved);
    }
}
function applyCustomCSS(css) {
    const styleTag = document.getElementById('userCustomCSS');
    styleTag.innerHTML = css;
}
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}
