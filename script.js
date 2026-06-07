// Дополнительный JS для лампового сайта (проекты + правила)
// Вся основная логика уже внутри HTML, этот файл расширяет функционал проектов

(function() {
    // перезагрузка проектов без перезагрузки страницы (опционально)
    async function refreshProjects() {
        const container = document.getElementById('projectsContainer');
        if (!container) return;
        try {
            const response = await fetch('projects.json?nocache=' + Date.now());
            if (!response.ok) throw new Error('нет файла');
            const projects = await response.json();
            if (!projects.length) {
                container.innerHTML = '<div class="project-card" style="justify-content:center;">🤷‍♂️ проектов пока нет, добавь в projects.json</div>';
                return;
            }
            container.innerHTML = projects.map(p => `
                <div class="project-card" data-link="${p.link || '#'}">
                    <div class="project-avatar">
                        ${p.avatarEmoji ? p.avatarEmoji : (p.avatarUrl ? `<img src="${p.avatarUrl}" width="56" style="border-radius:40px;">` : '📦')}
                    </div>
                    <div class="project-info">
                        <div class="project-name">${escapeHtml(p.name)}</div>
                    </div>
                </div>
            `).join('');
            document.querySelectorAll('.project-card').forEach(card => {
                const link = card.dataset.link;
                if (link && link !== '#') {
                    card.addEventListener('click', () => window.open(link, '_blank'));
                }
            });
        } catch(e) {
            container.innerHTML = '<div class="project-card">❌ projects.json не загружен, создай файл с массивом проектов</div>';
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

    // добавим скрытую кнопку для обновления проектов (можно в консоли вызвать)
    window.refreshProjects = refreshProjects;

    // если проекты уже загружены базовым скриптом, просто дополняем
    console.log('ламповый скрипт активен — используй refreshProjects() для перезагрузки проектов из json');
})();
