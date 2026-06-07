(function() {
    async function loadProjects() {
        const container = document.getElementById('projectsContainer');
        if (!container) return;
        try {
            const response = await fetch('projects.json?t=' + Date.now());
            if (!response.ok) throw new Error('файл не найден');
            const projects = await response.json();
            if (!projects.length) {
                container.innerHTML = '<div class="project-item"><div class="project-avatar">📁</div><div class="project-name">нет проектов, добавь в projects.json</div></div>';
                return;
            }
            container.innerHTML = projects.map(p => `
                <div class="project-item" data-link="${p.link || '#'}">
                    <div class="project-avatar">${p.avatarEmoji ? p.avatarEmoji : (p.avatarUrl ? `<img src="${p.avatarUrl}" width="32" style="border-radius:16px;">` : '📄')}</div>
                    <div class="project-name">${escapeHtml(p.name)}</div>
                </div>
            `).join('');
            document.querySelectorAll('.project-item').forEach(el => {
                const link = el.getAttribute('data-link');
                if (link && link !== '#') {
                    el.addEventListener('click', () => window.open(link, '_blank'));
                }
            });
        } catch(e) {
            container.innerHTML = '<div class="project-item"><div class="project-avatar">⚠️</div><div class="project-name">projects.json не найден</div></div>';
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    function renderRules() {
        const container = document.getElementById('rulesContent');
        if (!container) return;
        const rulesData = {
            temp: ["Запрещены политические дискуссии, агитация и провокационные темы, не относящиеся к проекту","За чрезмерное использование нецензурной лексики будет выдаваться предупреждение"],
            forbidden: ["Спам","ASCII графика","Флуд","Отправка материалов с тегом 18+ (Шок-контент)","Отправка стикеров с тегом 18+","Отправка сообщений/материалов от имени канала (Разрешено только от личного аккаунта)","Содержание в профиле аккаунта неподобающего контента","Прямые или косвенные оскорбления других участников","Дискриминация по национальному, религиозному или иному признаку","Угрозы","Действия, направленные на провокацию конфликтов, травлю или преследование участников","Пропаганда насилия, оружия, наркотических средств, алкоголя, табачных изделий","Распространение сообщений/материалов, разглашающие любую информацию участника/модератора/администратора без его согласия","Размещение рекламы сторонних проектов/ресурсов/файлов без разрешения администрации","Распространение программ с уязвимостями/вирусами","Продажа игровых аккаунтов/карт","Распространение ложной информации","Попрошайничество","Выдавать себя за модерацию/администрацию проектов","Критика действий модерации/администрации","Неадекватная критика. Даже если вам не нравится какой-то контент в игре, не стоит оскорблять чужой труд","Использование дополнительных аккаунтов для обхода ограничений/блокировки","Использование команд /report и @admin без весомой причины"],
            not_recommended: ["Злоупотребление Caps Lock","Злоупотребление смайлами","Злоупотребление реакциями под сообщениями","Игнорирование предупреждений от модерации/администрации"],
            info: ["Незнание правил не освобождает от ответственности","Администрация и модерация оставляет за собой право удалять сообщения без объяснения причин","С 00:00 до 09:00 (МСК) действует ограничение на отправку медиа во всех чатах","Если Вас не устраивает поведение какого-либо участника, Вы можете написать жалобу о нем, использовав команду /report или @admin"],
            report: ["Команда доступна только в ответ на сообщение с нарушением","Сообщение должно содержать указание причины нарушения"]
        };
        container.innerHTML = `
            <div class="rules-group"><h3>⏳ Временные правила</h3><ul class="rules-list">${rulesData.temp.map(t => `<li>${t}</li>`).join('')}</ul></div>
            <div class="rules-group"><h3>🚫 Запрещено</h3><ul class="rules-list">${rulesData.forbidden.map(f => `<li>${f}</li>`).join('')}</ul></div>
            <div class="rules-group"><h3>⚠️ Не рекомендуется</h3><ul class="rules-list">${rulesData.not_recommended.map(n => `<li>${n}</li>`).join('')}</ul></div>
            <div class="rules-group"><h3>ℹ️ Прочая информация</h3><ul class="rules-list">${rulesData.info.map(i => `<li>${i}</li>`).join('')}</ul></div>
            <div class="rules-group"><h3>📢 Жалоба (/report или @admin)</h3><ul class="rules-list">${rulesData.report.map(r => `<li>${r}</li>`).join('')}</ul></div>
        `;
    }

    function renderModerPanel() {
        const panel = document.getElementById('moderPanel');
        if (!panel) return;
        const punishments = [
            "Спам / Флуд / ASCII графика → Предупреждение + мут 1 час",
            "Контент 18+ (шок, стикеры) → Бан на 5 дней / перманент при рецидиве",
            "Оскорбления, дискриминация, травля → Мут 3 часа / бан до 14 дней",
            "Реклама без разрешения → Кик + предупреждение, повтор — бан",
            "Политические / религиозные провокации → Мут 6 часов / снятие прав у стажёра",
            "Выдача себя за администрацию → Перманентный бан без апелляции",
            "Критика действий модерации (публичная) → Выговор / лишение прав на 3 дня",
            "Использование мультиаккаунтов → Блокировка основного аккаунта + 30 дней бана",
            "Ложные /report / @admin → Предупреждение, при рецидиве мут 1 час"
        ];
        panel.innerHTML = `
            <div class="rules-group"><h3>🛡️ Наказания для стажёров и модераторов</h3><ul class="rules-list">${punishments.map(p => `<li>${p}</li>`).join('')}</ul></div>
            <div style="margin-top: 0.8rem; font-size:0.8rem; color:#b0b0c8;">⚙️ Администрация может ужесточить меры</div>
        `;
    }

    function initTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        const projectsDiv = document.getElementById('projectsPage');
        const rulesDiv = document.getElementById('rulesPage');
        if (!tabs.length) return;
        tabs.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                tabs.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (tab === 'projects') {
                    projectsDiv.classList.add('active-page');
                    rulesDiv.classList.remove('active-page');
                    loadProjects();
                } else {
                    rulesDiv.classList.add('active-page');
                    projectsDiv.classList.remove('active-page');
                }
            });
        });
    }

    function moderToggle() {
        const btn = document.getElementById('moderBtn');
        const panel = document.getElementById('moderPanel');
        if (btn && panel) {
            btn.addEventListener('click', () => {
                if (panel.style.display === 'none') {
                    panel.style.display = 'block';
                    btn.textContent = '❌ скрыть раздел модераторов';
                    renderModerPanel();
                } else {
                    panel.style.display = 'none';
                    btn.textContent = '🔐 раздел для модераторов и стажёров';
                }
            });
        }
    }

    renderRules();
    loadProjects();
    initTabs();
    moderToggle();
})();
