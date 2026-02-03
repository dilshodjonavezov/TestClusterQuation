// Admin Panel Logic
import { firebaseConfig, adminCredentials } from './config.js';
import { translations, t } from './translations.js';

let isLoggedIn = false;
let surveysData = [];
let filteredData = [];

export async function initAdmin() {
    // Check if already logged in
    isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

    try {
        // Initialize Firebase
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        window.firebaseApp = initializeApp(firebaseConfig);

        const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        window.db = getFirestore(window.firebaseApp);

        console.log('Firebase initialized');
    } catch (error) {
        console.warn('Firebase not configured, using localStorage:', error);
        window.db = null;
    }

    if (isLoggedIn) {
        await loadDashboard();
    } else {
        showLoginPage();
    }
}

function showLoginPage() {
    const app = document.getElementById('admin-app');

    app.innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
                <div class="text-center mb-8">
                    <div class="text-5xl mb-4">🔐</div>
                    <h1 class="text-3xl font-bold text-gray-900">
                        Административная панель
                    </h1>
                    <p class="text-gray-600 mt-2">Test Cluster Survey</p>
                </div>
                
                <form id="loginForm" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input type="email" id="email" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Пароль
                        </label>
                        <input type="password" id="password" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <button type="submit" 
                        class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold btn-hover">
                        Войти
                    </button>
                </form>
                
                <p class="text-sm text-gray-500 text-center mt-6">
                    Demo credentials: admin@testcluster.com / admin123
                </p>
            </div>
        </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === adminCredentials.email && password === adminCredentials.password) {
            isLoggedIn = true;
            sessionStorage.setItem('adminLoggedIn', 'true');
            loadDashboard();
        } else {
            alert('Неверный email или пароль');
        }
    });
}

async function loadDashboard() {
    try {
        // Load surveys
        await loadSurveys();
        renderDashboard();
    } catch (error) {
        console.error('Error loading dashboard:', error);
        renderDashboard(); // Render anyway with empty data
    }
}

async function loadSurveys() {
    if (window.db) {
        try {
            const { collection, getDocs, query, orderBy } = window.firestoreHelpers;
            const q = query(collection(window.db, 'surveys'), orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(q);

            surveysData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                surveysData.push({
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp?.toDate?.() || new Date(data.timestamp)
                });
            });
        } catch (error) {
            console.error('Firestore error:', error);
            surveysData = [];
        }
    } else {
        // Load from localStorage
        surveysData = JSON.parse(localStorage.getItem('surveys') || '[]');
        surveysData = surveysData.map((s, idx) => ({
            id: idx,
            ...s,
            timestamp: new Date(s.timestamp)
        }));
    }

    filteredData = [...surveysData];
}

function renderDashboard() {
    const app = document.getElementById('admin-app');

    const stats = calculateStats();

    app.innerHTML = `
        <div class="min-h-screen bg-gray-50">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">
                                Административная панель
                            </h1>
                            <p class="text-sm text-gray-600">Test Cluster Survey</p>
                        </div>
                        <button onclick="window.admin.logout()" 
                            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                            <i class="fas fa-sign-out-alt mr-2"></i>
                            Выйти
                        </button>
                    </div>
                </div>
            </header>
            
            <!-- Main Content -->
            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Statistics Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-md p-6">
                        <div class="flex items-center">
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-600">Всего ответов</p>
                                <p class="text-3xl font-bold text-gray-900">${stats.total}</p>
                            </div>
                            <div class="text-4xl">📊</div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-md p-6">
                        <div class="flex items-center">
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-600">Выпускники</p>
                                <p class="text-3xl font-bold text-blue-600">${stats.students}</p>
                            </div>
                            <div class="text-4xl">👨‍🎓</div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-md p-6">
                        <div class="flex items-center">
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-600">Преподаватели</p>
                                <p class="text-3xl font-bold text-purple-600">${stats.teachers}</p>
                            </div>
                            <div class="text-4xl">👨‍🏫</div>
                        </div>
                    </div>
                </div>
                
                <!-- Filters and Export -->
                <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Роль</label>
                            <select id="filterRole" onchange="window.admin.applyFilters()" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                <option value="">Все</option>
                                <option value="student">Выпускники</option>
                                <option value="teacher">Преподаватели</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Язык</label>
                            <select id="filterLanguage" onchange="window.admin.applyFilters()" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                <option value="">Все</option>
                                <option value="ru">Русский</option>
                                <option value="tj">Таджикский</option>
                                <option value="uz">Узбекский</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Класс</label>
                            <select id="filterGrade" onchange="window.admin.applyFilters()" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                <option value="">Все</option>
                                <option value="9">9</option>
                                <option value="11">11</option>
                            </select>
                        </div>
                        
                        <div class="md:col-span-2 flex items-end gap-2">
                            <button onclick="window.admin.exportToCSV()" 
                                class="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                                <i class="fas fa-download mr-2"></i>
                                Экспорт в CSV
                            </button>
                            <button onclick="window.admin.resetFilters()" 
                                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                                <i class="fas fa-redo mr-2"></i>
                                Сброс
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Results Table -->
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Дата
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Имя
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Роль
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Язык
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Действия
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="resultsTableBody" class="bg-white divide-y divide-gray-200">
                                ${renderTableRows()}
                            </tbody>
                        </table>
                    </div>
                    
                    ${filteredData.length === 0 ? `
                        <div class="text-center py-12">
                            <div class="text-6xl mb-4">📭</div>
                            <p class="text-gray-600">Нет данных</p>
                        </div>
                    ` : ''}
                </div>
            </main>
        </div>
    `;
}

function renderTableRows() {
    if (filteredData.length === 0) return '';

    return filteredData.map(survey => {
        const date = new Date(survey.timestamp).toLocaleDateString('ru-RU');
        const name = `${survey.respondent.firstName} ${survey.respondent.lastName}`;
        const role = survey.role === 'student' ? '👨‍🎓 Выпускник' : '👨‍🏫 Преподаватель';
        const langMap = { ru: '🇷🇺 РУ', tj: '🇹🇯 ТҶ', uz: '🇺🇿 УЗ' };
        const language = langMap[survey.language] || survey.language;

        return `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${date}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${name}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${role}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${language}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button onclick='window.admin.viewDetails(${JSON.stringify(survey).replace(/'/g, "&apos;")})' 
                        class="text-blue-600 hover:text-blue-800 font-medium">
                        <i class="fas fa-eye mr-1"></i>
                        Просмотр
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function calculateStats() {
    return {
        total: surveysData.length,
        students: surveysData.filter(s => s.role === 'student').length,
        teachers: surveysData.filter(s => s.role === 'teacher').length
    };
}

function applyFilters() {
    const role = document.getElementById('filterRole').value;
    const language = document.getElementById('filterLanguage').value;
    const grade = document.getElementById('filterGrade').value;

    filteredData = surveysData.filter(survey => {
        if (role && survey.role !== role) return false;
        if (language && survey.language !== language) return false;
        if (grade && survey.role === 'student' && survey.respondent.grade !== parseInt(grade)) return false;
        return true;
    });

    renderDashboard();
}

function resetFilters() {
    document.getElementById('filterRole').value = '';
    document.getElementById('filterLanguage').value = '';
    document.getElementById('filterGrade').value = '';
    filteredData = [...surveysData];
    renderDashboard();
}

function viewDetails(survey) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    const answersHtml = Object.entries(survey.answers).map(([key, value]) => {
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        return `
            <div class="mb-4">
                <p class="font-medium text-gray-700 mb-1">${key}:</p>
                <p class="text-gray-600">${displayValue || 'Нет ответа'}</p>
            </div>
        `;
    }).join('');

    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div class="flex justify-between items-start mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Детали ответа</h2>
                <button onclick="this.closest('.fixed').remove()" 
                    class="text-gray-400 hover:text-gray-600 text-2xl">
                    &times;
                </button>
            </div>
            
            <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Информация о респонденте</h3>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-500">Имя</p>
                        <p class="font-medium">${survey.respondent.firstName} ${survey.respondent.lastName}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Роль</p>
                        <p class="font-medium">${survey.role === 'student' ? 'Выпускник' : 'Преподаватель'}</p>
                    </div>
                    ${survey.role === 'student' ? `
                        <div>
                            <p class="text-sm text-gray-500">Класс</p>
                            <p class="font-medium">${survey.respondent.grade}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Пол</p>
                            <p class="font-medium">${survey.respondent.gender}</p>
                        </div>
                    ` : `
                        <div>
                            <p class="text-sm text-gray-500">Предмет</p>
                            <p class="font-medium">${survey.respondent.subject}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Стаж</p>
                            <p class="font-medium">${survey.respondent.experience} лет</p>
                        </div>
                    `}
                </div>
            </div>
            
            <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Ответы</h3>
                ${answersHtml}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function exportToCSV() {
    if (!window.Papa) {
        alert('CSV библиотека не загружена');
        return;
    }

    if (filteredData.length === 0) {
        alert('Нет данных для экспорта');
        return;
    }

    const csvData = filteredData.map(survey => {
        const flatData = {
            'Дата': new Date(survey.timestamp).toLocaleString('ru-RU'),
            'Имя': survey.respondent.firstName,
            'Фамилия': survey.respondent.lastName,
            'Роль': survey.role,
            'Язык': survey.language,
        };

        // Add respondent-specific fields
        if (survey.role === 'student') {
            flatData['Класс'] = survey.respondent.grade;
            flatData['Пол'] = survey.respondent.gender;
            flatData['Регион'] = survey.respondent.region || '';
        } else {
            flatData['Предмет'] = survey.respondent.subject;
            flatData['Стаж'] = survey.respondent.experience;
            flatData['Учреждение'] = survey.respondent.institution || '';
            flatData['Классы'] = survey.respondent.grades?.join(', ') || '';
        }

        // Add answers
        Object.entries(survey.answers).forEach(([key, value]) => {
            flatData[key] = Array.isArray(value) ? value.join('; ') : value;
        });

        return flatData;
    });

    const csv = window.Papa.unparse(csvData, {
        delimiter: ',',
        header: true
    });

    // Download
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `survey-results-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    isLoggedIn = false;
    showLoginPage();
}

// Export to global
window.admin = {
    initAdmin,
    applyFilters,
    resetFilters,
    viewDetails,
    exportToCSV,
    logout
};
