const questions = [
    {
        question: "What is Capital of Bangladesh?",
        answers: ["Dhaka", "Kuril", "Sylhet", "Rangpur"],
        correct: "Dhaka"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Jupiter", "Mars", "Venus", "Mercury"],
        correct: "Mars"
    },
    {
        question: "What is the national fruit of Bangladesh?",
        answers: ["Mango", "Jack Fruit", "Lichi", "Banana"],
        correct: "Jack Fruit"
    }
];

let currentQuestion = 0;
let score = 0;
let userName = "";

function showPage(pageId) {
    document.querySelectorAll('.container').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

function startQuiz() {
    userName = document.getElementById('userName').value.trim();
    if (!userName) {
        alert("Please enter your name!");
        return;
    }
    showPage('quizPage');
    displayQuestion();
}

function displayQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('questionText').textContent = q.question;
    const answersForm = document.getElementById('answers');
    answersForm.innerHTML = '';
    q.answers.forEach((answer, index) => {
        const div = document.createElement('div');
        div.classList.add('answer-option');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = answer;
        input.id = `answer${index}`;
        const label = document.createElement('label');
        label.htmlFor = `answer${index}`;
        label.textContent = answer;
        div.appendChild(input);
        div.appendChild(label);
        answersForm.appendChild(div);
    });
    document.getElementById('nextBtn').classList.add('hidden');
    answersForm.addEventListener('change', () => {
        document.getElementById('nextBtn').classList.remove('hidden');
    });
}

function nextQuestion() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;
    if (selected.value === questions[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    showPage('scorePage');
    document.getElementById('scoreText').textContent = `${userName}, you scored ${score} out of ${questions.length}!`;
    saveScore();
}

function saveScore() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push({
        name: userName,
        score: score,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function showLeaderboard() {
    showPage('leaderboardPage');
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const tableBody = document.getElementById('leaderboardTable');
    tableBody.innerHTML = '';
    leaderboard.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.name}</td><td>${entry.score}</td><td>${entry.date}</td>`;
        tableBody.appendChild(row);
    });
}

function goBack() {
    currentQuestion = 0;
    score = 0;
    userName = "";
    document.getElementById('userName').value = "";
    showPage('namePage');
}