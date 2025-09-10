// Sections
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const courseSection = document.getElementById('course-section');
const quizSection = document.getElementById('quiz-section');

// Login
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const userNameDisplay = document.getElementById('user-name');

loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if(username) {
        localStorage.setItem('username', username);
        userNameDisplay.textContent = username;
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        loadProgress();
    }
});

// Courses Data
const courses = {
    html: {
        title: 'HTML Basics',
        video: 'https://www.youtube.com/embed/pQN-pnXPaVg',
        desc: 'Learn the basics of HTML structure and tags.',
        quiz: [
            { q: 'HTML stands for?', options: ['Hyper Text Markup Language','Home Tool Markup Language','Hyperlinks Text Mark Language'], ans: 0 },
            { q: 'The <a> tag is used for?', options: ['Link','Paragraph','Image'], ans: 0 },
            { q: 'Which tag creates a list?', options: ['<ul>','<p>','<h1>'], ans: 0 }
        ]
    },
    css: {
        title: 'CSS Fundamentals',
        video: 'https://www.youtube.com/embed/1Rs2ND1ryYc',
        desc: 'Learn how to style web pages using CSS.',
        quiz: [
            { q: 'CSS stands for?', options: ['Cascading Style Sheets','Colorful Style Sheets','Computer Style Sheets'], ans: 0 },
            { q: 'Which property changes text color?', options: ['color','font','background'], ans: 0 },
            { q: 'To center text use?', options: ['text-align','align-text','center'], ans: 0 }
        ]
    },
    js: {
        title: 'JavaScript Essentials',
        video: 'https://www.youtube.com/embed/W6NZfCO5SIk',
        desc: 'Learn basic JavaScript for interactive web pages.',
        quiz: [
            { q: 'JS stands for?', options: ['JavaScript','JavaSource','JustScript'], ans: 0 },
            { q: 'Which symbol is used for comments?', options: ['//','/*','$$'], ans: 0 },
            { q: 'To declare a variable use?', options: ['var','v','variable'], ans: 0 }
        ]
    }
};

let currentCourse = '';

// Start Course
document.querySelectorAll('.start-course-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const courseKey = e.target.parentElement.getAttribute('data-course');
        currentCourse = courseKey;
        showCourse(courseKey);
    });
});

function showCourse(courseKey) {
    dashboardSection.classList.add('hidden');
    courseSection.classList.remove('hidden');
    document.getElementById('course-title').textContent = courses[courseKey].title;
    document.getElementById('course-video').src = courses[courseKey].video;
    document.getElementById('course-desc').textContent = courses[courseKey].desc;
}

// Back to Dashboard
document.getElementById('back-dashboard-btn').addEventListener('click', () => {
    courseSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
});

// Take Quiz
document.getElementById('take-quiz-btn').addEventListener('click', () => {
    courseSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    loadQuiz();
});

// Back to Course
document.getElementById('back-course-btn').addEventListener('click', () => {
    quizSection.classList.add('hidden');
    courseSection.classList.remove('hidden');
});

// Quiz
const quizForm = document.getElementById('quiz-form');
const submitQuizBtn = document.getElementById('submit-quiz-btn');

function loadQuiz() {
    quizForm.innerHTML = '';
    document.getElementById('quiz-title').textContent = courses[currentCourse].title + ' Quiz';
    courses[currentCourse].quiz.forEach((q, idx) => {
        const div = document.createElement('div');
        div.innerHTML = `<p>${idx+1}. ${q.q}</p>` + q.options.map((opt, i) => 
            `<label><input type="radio" name="q${idx}" value="${i}"> ${opt}</label>`).join('');
        quizForm.appendChild(div);
    });
}

submitQuizBtn.addEventListener('click', () => {
    let score = 0;
    courses[currentCourse].quiz.forEach((q, idx) => {
        const selected = quizForm.querySelector(`input[name=q${idx}]:checked`);
        if(selected && parseInt(selected.value) === q.ans) score++;
    });
    alert(`You scored ${score} / ${courses[currentCourse].quiz.length}`);
    updateProgress(currentCourse, score / courses[currentCourse].quiz.length * 100);
    quizSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    loadProgress();
});

// Progress Tracking
function updateProgress(courseKey, value) {
    let progress = JSON.parse(localStorage.getItem('progress')) || {};
    progress[courseKey] = value;
    localStorage.setItem('progress', JSON.stringify(progress));
}

function loadProgress() {
    let progress = JSON.parse(localStorage.getItem('progress')) || {};
    document.getElementById('html-progress').style.width = (progress.html || 0) + '%';
    document.getElementById('css-progress').style.width = (progress.css || 0) + '%';
    document.getElementById('js-progress').style.width = (progress.js || 0) + '%';
}

// Load username if already logged in
const storedUser = localStorage.getItem('username');
if(storedUser) {
    userNameDisplay.textContent = storedUser;
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    loadProgress();
}
