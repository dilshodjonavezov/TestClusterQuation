// Admin Panel Logic
import { firebaseConfig, adminCredentials } from './config.js';
import { translations, t } from './translations.js';
import { studentQuestions } from './questions-students.js';
import { teacherQuestions } from './questions-teachers.js';

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
                            <button onclick="window.admin.exportToExcel()" 
                                class="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition">
                                <i class="fas fa-file-excel mr-2"></i>
                                Экспорт в Excel
                            </button>
                            <button onclick="window.admin.resetAndSeed()" 
                                class="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition">
                                <i class="fas fa-trash mr-2"></i>
                                Сброс и генерация
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
        const middleName = survey.respondent.middleName ? ` ${survey.respondent.middleName}` : '';
        const name = `${survey.respondent.firstName}${middleName} ${survey.respondent.lastName}`;
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

    const questionMap = getQuestionTextMap(survey.role, survey.language);
    const answersHtml = getSortedAnswerEntries(survey).map(([key, value]) => {
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        const questionText = questionMap[key] || key;
        return `
            <div class="mb-4">
                <p class="font-medium text-gray-700 mb-1">${questionText}:</p>
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
                        <p class="font-medium">${survey.respondent.firstName} ${survey.respondent.middleName || ''} ${survey.respondent.lastName}</p>
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
        const questionMap = getQuestionTextMap(survey.role, 'ru');
        const flatData = {
            'Дата': new Date(survey.timestamp).toLocaleString('ru-RU'),
            'Имя': survey.respondent.firstName,
            'Отчество': survey.respondent.middleName || '',
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
        getSortedAnswerEntries(survey).forEach(([key, value]) => {
            const questionText = questionMap[key] || key;
            flatData[questionText] = Array.isArray(value) ? value.join('; ') : value;
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

function getQuestionTextMap(role, lang) {
    const questions = role === 'student' ? studentQuestions : teacherQuestions;
    const questionMap = {};

    questions.forEach((question) => {
        const translation = question.translations?.[lang] || question.translations?.ru || {};
        const questionText = translation.question || `q${question.id}`;
        questionMap[`q${question.id}`] = questionText;
    });

    return questionMap;
}

function getSortedAnswerEntries(survey) {
    return Object.entries(survey.answers || {}).sort((a, b) => {
        const aNum = getQuestionNumber(a[0]);
        const bNum = getQuestionNumber(b[0]);
        return aNum - bNum;
    });
}

function getQuestionNumber(key) {
    const match = /^q(\d+)$/.exec(key);
    return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

function exportToExcel() {
    if (!window.XLSX) {
        alert('Excel библиотека не загружена');
        return;
    }

    if (filteredData.length === 0) {
        alert('Нет данных для экспорта');
        return;
    }

    const baseColumns = [
        'Дата',
        'Имя',
        'Отчество',
        'Фамилия',
        'Роль',
        'Язык',
        'Класс',
        'Пол',
        'Регион',
        'Предмет',
        'Стаж',
        'Учреждение',
        'Классы'
    ];

    const questionColumns = [];
    const questionColumnSet = new Set();

    filteredData.forEach((survey) => {
        const questionMap = getQuestionTextMap(survey.role, 'ru');
        getSortedAnswerEntries(survey).forEach(([key]) => {
            const questionText = questionMap[key] || key;
            if (!questionColumnSet.has(questionText)) {
                questionColumnSet.add(questionText);
                questionColumns.push(questionText);
            }
        });
    });

    const header = [...baseColumns, ...questionColumns];

    const rows = filteredData.map((survey) => {
        const questionMap = getQuestionTextMap(survey.role, 'ru');
        const row = {
            'Дата': new Date(survey.timestamp).toLocaleString('ru-RU'),
            'Имя': survey.respondent.firstName,
            'Отчество': survey.respondent.middleName || '',
            'Фамилия': survey.respondent.lastName,
            'Роль': survey.role,
            'Язык': survey.language,
            'Класс': survey.role === 'student' ? survey.respondent.grade : '',
            'Пол': survey.role === 'student' ? survey.respondent.gender : '',
            'Регион': survey.role === 'student' ? (survey.respondent.region || '') : '',
            'Предмет': survey.role === 'teacher' ? survey.respondent.subject : '',
            'Стаж': survey.role === 'teacher' ? survey.respondent.experience : '',
            'Учреждение': survey.role === 'teacher' ? (survey.respondent.institution || '') : '',
            'Классы': survey.role === 'teacher' ? (survey.respondent.grades?.join(', ') || '') : ''
        };

        getSortedAnswerEntries(survey).forEach(([key, value]) => {
            const questionText = questionMap[key] || key;
            row[questionText] = Array.isArray(value) ? value.join('; ') : value;
        });

        return row;
    });

    const worksheet = window.XLSX.utils.json_to_sheet(rows, { header });
    const workbook = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(workbook, worksheet, 'Survey Results');
    window.XLSX.writeFile(workbook, `survey-results-${new Date().toISOString().split('T')[0]}.xlsx`);
}

async function resetAndSeed() {
    if (!window.db) {
        alert('Firebase не подключен. Сброс доступен только при работе с Firestore.');
        return;
    }

    const confirmed = confirm('Это удалит ВСЕ ответы и создаст 110 новых учеников. Продолжить?');
    if (!confirmed) return;

    try {
        await deleteAllSurveys();
        const surveys = generateStudentSurveys(110, { tjPercent: 80, ruPercent: 20 });
        await seedSurveys(surveys);
        await loadSurveys();
        renderDashboard();
        alert('Готово: база очищена и заполнена 110 учениками.');
    } catch (error) {
        console.error('Reset/Seed error:', error);
        alert('Ошибка при сбросе/генерации. Подробности в консоли.');
    }
}

async function deleteAllSurveys() {
    const { collection, getDocs, writeBatch, doc } = window.firestoreHelpers;
    const colRef = collection(window.db, 'surveys');
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) return 0;

    const batches = [];
    let batch = writeBatch(window.db);
    let batchCount = 0;
    let deleted = 0;

    snapshot.forEach((docSnap) => {
        batch.delete(doc(window.db, 'surveys', docSnap.id));
        batchCount++;
        deleted++;

        if (batchCount >= 450) {
            batches.push(batch);
            batch = writeBatch(window.db);
            batchCount = 0;
        }
    });

    if (batchCount > 0) {
        batches.push(batch);
    }

    for (const b of batches) {
        await b.commit();
    }

    return deleted;
}

async function seedSurveys(surveys) {
    const { collection, writeBatch, doc } = window.firestoreHelpers;
    const colRef = collection(window.db, 'surveys');

    let batch = writeBatch(window.db);
    let batchCount = 0;

    for (const survey of surveys) {
        const docRef = doc(colRef);
        batch.set(docRef, survey);
        batchCount++;

        if (batchCount >= 450) {
            await batch.commit();
            batch = writeBatch(window.db);
            batchCount = 0;
        }
    }

    if (batchCount > 0) {
        await batch.commit();
    }
}

function generateStudentSurveys(count, { tjPercent = 80, ruPercent = 20 } = {}) {
    const tjCount = Math.round((count * tjPercent) / 100);
    const ruCount = count - tjCount;

    const languages = [
        ...Array(tjCount).fill('tj'),
        ...Array(ruCount).fill('ru')
    ];

    shuffleArray(languages);

    return languages.map((lang) => createStudentSurvey(lang));
}

function createStudentSurvey(lang) {
    const gender = Math.random() < 0.5 ? 'М' : 'Ж';
    const firstName = gender === 'М'
        ? randomFromArray(TAJIK_FIRST_NAMES_MALE)
        : randomFromArray(TAJIK_FIRST_NAMES_FEMALE);
    const lastName = randomFromArray(TAJIK_LAST_NAMES);
    const middleName = createPatronymic(gender);

    const respondent = {
        firstName,
        middleName,
        lastName,
        grade: 11,
        gender,
        region: 'Бабаджан Гафуровский район, Джамоати Хистеварз, школа №5'
    };

    const answers = {};

    studentQuestions.forEach((question) => {
        const translation = question.translations?.[lang] || question.translations?.ru;
        if (!translation) return;

        const options = translation.options || [];

        if (question.type === 'single') {
            answers[`q${question.id}`] = randomFromArray(options);
        } else if (question.type === 'multiple') {
            const max = question.maxselect || Math.min(3, options.length);
            const min = 1;
            const count = Math.max(min, Math.floor(Math.random() * max) + 1);
            answers[`q${question.id}`] = pickRandomUnique(options, count);
        } else if (question.type === 'textarea') {
            answers[`q${question.id}`] = createFreeTextAnswer(lang);
        } else {
            answers[`q${question.id}`] = '';
        }
    });

    return {
        timestamp: randomRecentDate(30),
        language: lang,
        role: 'student',
        respondent,
        answers
    };
}

function randomRecentDate(daysBack) {
    const now = Date.now();
    const offset = Math.floor(Math.random() * daysBack * 24 * 60 * 60 * 1000);
    return new Date(now - offset);
}

function randomFromArray(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function pickRandomUnique(list, count) {
    const copy = [...list];
    shuffleArray(copy);
    return copy.slice(0, Math.min(count, copy.length));
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function createPatronymic(gender) {
    const base = randomFromArray(TAJIK_PATRONYMIC_BASES);
    return gender === 'М' ? `${base}ович` : `${base}овна`;
}

function createFreeTextAnswer(lang) {
    const ru = [
        'Хотел(а) бы больше тестов и понятные объяснения.',
        'Важно, чтобы приложение было простым и полезным.',
        'Было бы хорошо добавить больше примеров и задач.'
    ];
    const tj = [
        'Мехоҳам, ки барнома содда ва фоидаовар бошад.',
        'Бисёр хуб мешуд, агар саволҳо бештар бошанд.',
        'Идеяҳо ва пешниҳодҳо барои беҳтар кардан дорам.'
    ];

    return randomFromArray(lang === 'tj' ? tj : ru);
}

const TAJIK_FIRST_NAMES_MALE = [
    'Абдулло', 'Азиз', 'Бахтиёр', 'Бехруз', 'Далер', 'Джамшед', 'Джовид', 'Фирдавс', 'Искандар', 'Комрон',
    'Мухаммад', 'Нозим', 'Парвиз', 'Рустам', 'Сухроб', 'Умед', 'Фаррух', 'Хайриддин', 'Шахзод', 'Эмомали'
];

const TAJIK_FIRST_NAMES_FEMALE = [
    'Азиза', 'Бахора', 'Гулноза', 'Дилноза', 'Зулфия', 'Зебо', 'Мавзуна', 'Мадина', 'Мехрона', 'Муниса',
    'Нигина', 'Нодира', 'Нозия', 'Ойша', 'Рухшона', 'Сайёра', 'Ситора', 'Фарангис', 'Шахло', 'Юлдуз'
];

const TAJIK_LAST_NAMES = [
    'Абдуллоев', 'Азизов', 'Бахтиёров', 'Далеров', 'Джамшедов', 'Джураев', 'Каримов', 'Кодиров', 'Комилов', 'Мамадов',
    'Назаров', 'Нуров', 'Рахмонов', 'Саидов', 'Султонов', 'Темуров', 'Умаров', 'Файзиев', 'Хайриддинов', 'Юсуфов'
];

const TAJIK_PATRONYMIC_BASES = [
    'Абдулло', 'Азиз', 'Бахтиёр', 'Далер', 'Джамшед', 'Фирдавс', 'Искандар', 'Комрон', 'Мухаммад', 'Парвиз',
    'Рустам', 'Сухроб', 'Умед', 'Фаррух', 'Шахзод'
];

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
    exportToExcel,
    resetAndSeed,
    logout
};
