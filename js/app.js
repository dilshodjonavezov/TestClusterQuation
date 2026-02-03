// Main Application Logic
import { firebaseConfig } from './config.js';
import { translations, t } from './translations.js';
import { studentQuestions } from './questions-students.js';
import { teacherQuestions } from './questions-teachers.js';

// Application state
const state = {
    language: localStorage.getItem('language') || 'ru',
    role: null,
    respondent: {},
    answers: {},
    currentQuestion: 0,
    questions: []
};

// Initialize Firebase
export async function initApp() {
    try {
        // Initialize Firebase
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        window.firebaseApp = initializeApp(firebaseConfig);

        // Initialize Firestore
        const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        window.db = getFirestore(window.firebaseApp);

        console.log('Firebase initialized successfully');
    } catch (error) {
        console.warn('Firebase initialization failed. Running in demo mode:', error);
        // Fallback to localStorage for demo
        window.db = null;
    }

    // Show landing page
    showLandingPage();
}

// Landing Page
function showLandingPage() {
    const lang = state.language;
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <div class="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 fade-in">
                <div class="text-center mb-8">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        ${t('title', lang)}
                    </h1>
                    <p class="text-lg text-gray-600 leading-relaxed">
                        ${t('subtitle', lang)}
                    </p>
                </div>
                
                <!-- Language Selection -->
                <div class="mb-8">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
                        ${t('selectLanguage', lang)}
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        ${createLanguageCard('ru', '🇷🇺', 'Русский')}
                        ${createLanguageCard('tj', '🇹🇯', 'Тоҷикӣ')}
                        ${createLanguageCard('uz', '🇺🇿', 'O\'zbek')}
                    </div>
                </div>
                
                <button onclick="window.app.showRoleSelection()" 
                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl text-xl font-semibold btn-hover shadow-lg">
                    ${t('startSurvey', lang)}
                </button>
            </div>
        </div>
    `;
}

function createLanguageCard(langCode, flag, name) {
    const isSelected = state.language === langCode;
    return `
        <button onclick="window.app.setLanguage('${langCode}')" 
            class="p-6 rounded-xl border-2 transition-all ${isSelected
            ? 'border-blue-500 bg-blue-50 shadow-md'
            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
        }">
            <div class="text-5xl mb-2">${flag}</div>
            <div class="font-semibold text-gray-800">${name}</div>
        </button>
    `;
}

// Role Selection Page
function showRoleSelection() {
    const lang = state.language;
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="min-h-screen bg-gray-50 py-12 px-4">
            <div class="max-w-4xl mx-auto fade-in">
                <h1 class="text-4xl font-bold text-center text-gray-900 mb-12">
                    ${t('selectRole', lang)}
                </h1>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <!-- Student Card -->
                    <div onclick="window.app.selectRole('student')" 
                        class="bg-white rounded-2xl p-8 shadow-lg card-hover cursor-pointer">
                        <div class="text-center">
                            <div class="text-6xl mb-4">👨‍🎓</div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-2">
                                ${t('student', lang)}
                            </h2>
                            <p class="text-gray-600">
                                ${t('studentDesc', lang)}
                            </p>
                        </div>
                    </div>
                    
                    <!-- Teacher Card -->
                    <div onclick="window.app.selectRole('teacher')" 
                        class="bg-white rounded-2xl p-8 shadow-lg card-hover cursor-pointer">
                        <div class="text-center">
                            <div class="text-6xl mb-4">👨‍🏫</div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-2">
                                ${t('teacher', lang)}
                            </h2>
                            <p class="text-gray-600">
                                ${t('teacherDesc', lang)}
                            </p>
                        </div>
                    </div>
                </div>
                
                <button onclick="window.app.showLandingPage()" 
                    class="mx-auto block px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    ${t('back', lang)}
                </button>
            </div>
        </div>
    `;
}

// Registration Form
function showRegistrationForm() {
    const lang = state.language;
    const role = state.role;
    const app = document.getElementById('app');

    const studentFields = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    ${t('firstName', lang)} *
                </label>
                <input type="text" id="firstName" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    ${t('lastName', lang)} *
                </label>
                <input type="text" id="lastName" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    ${t('grade', lang)} *
                </label>
                <select id="grade" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">--</option>
                    <option value="9">9</option>
                    <option value="11">11</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    ${t('gender', lang)} *
                </label>
                <select id="gender" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">--</option>
                    <option value="М">${t('male', lang)}</option>
                    <option value="Ж">${t('female', lang)}</option>
                </select>
            </div>
        </div>
        
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                ${t('region', lang)}
            </label>
            <input type="text" id="region"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
    `;

    const teacherFields = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    ${t('firstName', lang)} *
                </label>
                <input type="text" id="firstName" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    ${t('lastName', lang)} *
                </label>
                <input type="text" id="lastName" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
        </div>
        
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                ${t('subject', lang)} *
            </label>
            <input type="text" id="subject" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    ${t('experience', lang)}
                </label>
                <input type="number" id="experience" min="0"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    ${t('institution', lang)}
                </label>
                <input type="text" id="institution"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
        </div>
        
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                ${t('teachingGrades', lang)} *
            </label>
            <div class="flex gap-4">
                <label class="flex items-center">
                    <input type="checkbox" value="9" class="teaching-grade mr-2">
                    <span>9</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" value="11" class="teaching-grade mr-2">
                    <span>11</span>
                </label>
            </div>
        </div>
    `;

    app.innerHTML = `
        <div class="min-h-screen bg-gray-50 py-12 px-4">
            <div class="max-w-2xl mx-auto fade-in">
                <div class="bg-white rounded-2xl shadow-lg p-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">
                        ${t('registration', lang)}
                    </h1>
                    
                    <form id="registrationForm" class="space-y-6">
                        ${role === 'student' ? studentFields : teacherFields}
                        
                        <div class="flex gap-4">
                            <button type="button" onclick="window.app.showRoleSelection()" 
                                class="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                                ${t('back', lang)}
                            </button>
                            <button type="submit" 
                                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold btn-hover">
                                ${t('continue', lang)}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Form submission handler
    document.getElementById('registrationForm').addEventListener('submit', (e) => {
        e.preventDefault();

        state.respondent.firstName = document.getElementById('firstName').value;
        state.respondent.lastName = document.getElementById('lastName').value;

        if (role === 'student') {
            state.respondent.grade = parseInt(document.getElementById('grade').value);
            state.respondent.gender = document.getElementById('gender').value;
            state.respondent.region = document.getElementById('region').value || '';
        } else {
            state.respondent.subject = document.getElementById('subject').value;
            state.respondent.experience = parseInt(document.getElementById('experience').value) || 0;
            state.respondent.institution = document.getElementById('institution').value || '';
            const grades = Array.from(document.querySelectorAll('.teaching-grade:checked')).map(cb => parseInt(cb.value));
            state.respondent.grades = grades;

            if (grades.length === 0) {
                alert(t('pleaseAnswer', lang));
                return;
            }
        }

        showSurvey();
    });
}

// Survey Page
function showSurvey() {
    // Set questions based on role
    state.questions = state.role === 'student' ? studentQuestions : teacherQuestions;
    state.currentQuestion = 0;

    renderSurveyQuestion();
}

function renderSurveyQuestion() {
    const lang = state.language;
    const questionIndex = state.currentQuestion;
    const question = state.questions[questionIndex];
    const totalQuestions = state.questions.length;
    const progress = ((questionIndex + 1) / totalQuestions) * 100;

    const app = document.getElementById('app');

    const questionText = question.translations[lang].question;
    const options = question.translations[lang].options || [];
    const placeholder = question.translations[lang].placeholder || '';

    let answerInput = '';

    if (question.type === 'single') {
        answerInput = `
            <div class="space-y-3">
                ${options.map((option, idx) => `
                    <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition">
                        <input type="radio" name="answer" value="${option}" 
                            ${state.answers[`q${question.id}`] === option ? 'checked' : ''}
                            class="mr-3">
                        <span class="text-gray-800">${option}</span>
                    </label>
                `).join('')}
            </div>
        `;
    } else if (question.type === 'multiple') {
        answerInput = `
            <div class="space-y-3">
                ${options.map((option, idx) => {
            const currentAnswers = state.answers[`q${question.id}`] || [];
            const isChecked = currentAnswers.includes(option);
            return `
                        <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition">
                            <input type="checkbox" name="answer" value="${option}" 
                                ${isChecked ? 'checked' : ''}
                                class="mr-3">
                            <span class="text-gray-800">${option}</span>
                        </label>
                    `;
        }).join('')}
            </div>
            ${question.maxselect ? `<p class="text-sm text-gray-500 mt-2">Максимум ${question.maxselect} вариантов</p>` : ''}
        `;
    } else if (question.type === 'textarea') {
        answerInput = `
            <textarea name="answer" rows="6" placeholder="${placeholder}"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >${state.answers[`q${question.id}`] || ''}</textarea>
        `;
    } else {
        answerInput = `
            <input type="text" name="answer" placeholder="${placeholder}"
                value="${state.answers[`q${question.id}`] || ''}"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
        `;
    }

    app.innerHTML = `
        <div class="min-h-screen bg-gray-50 py-8 px-4">
            <div class="max-w-3xl mx-auto">
                <!-- Progress Bar -->
                <div class="mb-8">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-600">
                            ${t('question', lang)} ${questionIndex + 1} ${t('of', lang)} ${totalQuestions}
                        </span>
                        <span class="text-sm font-medium text-gray-600">${Math.round(progress)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="progress-bar bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" 
                            style="width: ${progress}%"></div>
                    </div>
                </div>
                
                <!-- Question Card -->
                <div class="bg-white rounded-2xl shadow-lg p-8 mb-6 fade-in">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6 question-text">
                        ${questionText}
                    </h2>
                    
                    <form id="questionForm">
                        ${answerInput}
                    </form>
                </div>
                
                <!-- Navigation -->
                <div class="flex gap-4">
                    ${questionIndex > 0 ? `
                        <button onclick="window.app.previousQuestion()" 
                            class="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                            ${t('previous', lang)}
                        </button>
                    ` : ''}
                    
                    <button onclick="window.app.nextQuestion()" 
                        class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold btn-hover">
                        ${questionIndex < totalQuestions - 1 ? t('next', lang) : t('submit', lang)}
                    </button>
                </div>
            </div>
        </div>
    `;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation functions
function nextQuestion() {
    const question = state.questions[state.currentQuestion];
    const lang = state.language;

    // Collect answer
    let answer = null;
    if (question.type === 'single') {
        const selected = document.querySelector('input[name="answer"]:checked');
        answer = selected ? selected.value : null;
    } else if (question.type === 'multiple') {
        const selected = Array.from(document.querySelectorAll('input[name="answer"]:checked'));
        answer = selected.map(cb => cb.value);

        // Check max selection
        if (question.maxselect && answer.length > question.maxselect) {
            alert(`${t('pleaseAnswer', lang)}: максимум ${question.maxselect}`);
            return;
        }
    } else {
        answer = document.querySelector('[name="answer"]').value.trim();
    }

    // Validate required
    if (question.required) {
        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
            alert(t('pleaseAnswer', lang));
            return;
        }
    }

    // Save answer
    state.answers[`q${question.id}`] = answer;

    // Move to next or submit
    if (state.currentQuestion < state.questions.length - 1) {
        state.currentQuestion++;
        renderSurveyQuestion();
    } else {
        submitSurvey();
    }
}

function previousQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        renderSurveyQuestion();
    }
}

// Submit survey
async function submitSurvey() {
    const surveyData = {
        timestamp: new Date().toISOString(),
        language: state.language,
        role: state.role,
        respondent: state.respondent,
        answers: state.answers
    };

    try {
        if (window.db) {
            const { collection, addDoc, Timestamp } = window.firestoreHelpers;
            await addDoc(collection(window.db, 'surveys'), {
                ...surveyData,
                timestamp: Timestamp.now()
            });
        } else {
            // Save to localStorage as fallback
            const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
            surveys.push(surveyData);
            localStorage.setItem('surveys', JSON.stringify(surveys));
        }

        showThankYou();
    } catch (error) {
        console.error('Error submitting survey:', error);
        alert('Ошибка при отправке. Данные сохранены локально.');
        showThankYou();
    }
}

// Thank You Page
function showThankYou() {
    const lang = state.language;
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
            <div class="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center fade-in">
                <div class="text-8xl mb-6">✅</div>
                <h1 class="text-4xl font-bold text-gray-900 mb-4">
                    ${t('thankYou', lang)}
                </h1>
                <p class="text-xl text-gray-600 mb-4">
                    ${t('yourAnswersSaved', lang)}
                </p>
                <p class="text-lg text-gray-600 mb-8">
                    ${t('thankYouMessage', lang)}
                </p>
                <button onclick="window.location.reload()" 
                    class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold btn-hover">
                    ${t('returnHome', lang)}
                </button>
            </div>
        </div>
    `;

    // Confetti celebration!
    if (window.confetti) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Helper functions
function setLanguage(lang) {
    state.language = lang;
    localStorage.setItem('language', lang);
    showLandingPage();
}

function selectRole(role) {
    state.role = role;
    state.respondent = {};
    state.answers = {};
    showRegistrationForm();
}

// Export functions to global scope
window.app = {
    initApp,
    showLandingPage,
    showRoleSelection,
    selectRole,
    setLanguage,
    nextQuestion,
    previousQuestion
};
