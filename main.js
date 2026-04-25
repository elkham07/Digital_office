// Initialize Lucide icons
lucide.createIcons();

// --- AUTH & ROLES LOGIC ---
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const userName = localStorage.getItem('userName');

// Redirect to login if not authenticated (except on login.html)
if (!token && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
}

// Function to update sidebar based on role
function updateNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    // If Client role, modify sidebar
    if (role === 'client') {
        nav.innerHTML = `
            <div class="nav-label">Главное</div>
            <a href="index.html" class="nav-item ${isActive('index.html')}"><i data-lucide="layout-dashboard"></i><span>Дашборд</span></a>
            
            <div class="nav-label">Контент</div>
            <a href="programs.html" class="nav-item ${isActive('programs.html')}"><i data-lucide="dumbbell"></i><span>Программы</span></a>
            <a href="progress.html" class="nav-item ${isActive('progress.html')}"><i data-lucide="trending-up"></i><span>Прогресс</span></a>
            <a href="schedule.html" class="nav-item ${isActive('schedule.html')}"><i data-lucide="calendar"></i><span>Расписание</span></a>

            <div class="nav-label">Финансы</div>
            <a href="payments.html" class="nav-item ${isActive('payments.html')}"><i data-lucide="credit-card"></i><span>Платежи</span></a>
        `;
    } else {
        // Coach role (Default)
        nav.innerHTML = `
            <div class="nav-label">Главное</div>
            <a href="index.html" class="nav-item ${isActive('index.html')}"><i data-lucide="layout-dashboard"></i><span>Дашборд</span></a>
            <a href="clients.html" class="nav-item ${isActive('clients.html')}"><i data-lucide="users"></i><span>Клиенты</span></a>
            <a href="schedule.html" class="nav-item ${isActive('schedule.html')}"><i data-lucide="calendar"></i><span>Расписание</span></a>

            <div class="nav-label">Контент</div>
            <a href="library.html" class="nav-item ${isActive('library.html')}"><i data-lucide="book-open"></i><span>Библиотека</span></a>
            <a href="programs.html" class="nav-item ${isActive('programs.html')}"><i data-lucide="dumbbell"></i><span>Программы</span></a>
            
            <div class="nav-label">Инструменты</div>
            <a href="booking-bot.html" class="nav-item ${isActive('booking-bot.html')}"><i data-lucide="bot"></i><span>Booking Bot</span></a>
        `;
    }
    lucide.createIcons();
}

function isActive(path) {
    return window.location.pathname.includes(path) ? 'active' : '';
}

// Update User Info
function updateProfile() {
    const coachName = document.querySelector('.coach-name');
    const userPillName = document.querySelector('.user-pill span');
    const avatars = document.querySelectorAll('.coach-avatar img, .user-pill img');
    
    if (coachName) coachName.innerText = userName || 'User';
    if (userPillName) userPillName.innerText = userName || 'User';
    
    const seed = userName ? userName.replace(/\s/g, '') : 'default';
    avatars.forEach(img => {
        img.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    });
}

// Logout Logic
function setupLogout() {
    const footer = document.querySelector('.sidebar-footer');
    if (footer) {
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'nav-item';
        logoutBtn.style.marginTop = '10px';
        logoutBtn.style.width = '100%';
        logoutBtn.style.background = 'transparent';
        logoutBtn.style.border = 'none';
        logoutBtn.style.color = 'var(--muted)';
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.innerHTML = `<i data-lucide="log-out"></i><span>Выйти</span>`;
        
        logoutBtn.onclick = () => {
            localStorage.clear();
            window.location.href = 'login.html';
        };
        footer.appendChild(logoutBtn);
        lucide.createIcons();
    }
}

// --- THEME & INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    updateProfile();
    setupLogout();

    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        updateToggleIcon(savedTheme);
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcon(newTheme);
        });
    }
});

function updateToggleIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'light' ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
    lucide.createIcons();
}
