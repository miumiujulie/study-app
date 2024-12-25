let questions = {
    german: [],
    spanish: [],
    philosophy: [],
    informatics: [],
    maths: [],
    history: [],
    biology: [],
    english: [],
    sports: [],
    politicEconomics: []
};

let currentScore = 0;
let currentTotal = 0;

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function addQuestion() {
    const subject = document.getElementById('subject-select').value;
    const questionText = document.getElementById('question').value;
    const answerText = document.getElementById('answer').value;

    if (questionText && answerText) {
        questions[subject].push({ question: questionText, answer: answerText });
        alert('Frage hinzugefügt!');
        document.getElementById('question').value = '';
        document.getElementById('answer').value = '';
    } else {
        alert('Bitte sowohl eine Frage als auch eine Antwort eingeben!');
    }
}

function startTest() {
    const subject = document.getElementById('test-subject-select').value;
    const testArea = document.getElementById('test-questions');
    testArea.innerHTML = ''; // Reset the area

    if (questions[subject].length === 0) {
        testArea.innerHTML = '<p>Keine Fragen für dieses Fach vorhanden!</p>';
    } else {
        currentScore = 0;
        currentTotal = questions[subject].length;

        questions[subject].forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<p>${item.question}</p><p class="answer">${item.answer}</p>`;
            card.onclick = () => flipCard(card, index);
            testArea.appendChild(card);
        });
    }
}

function flipCard(card, index) {
    card.classList.toggle('flipped');
    const answerVisible = card.classList.contains('flipped');
    if (answerVisible) {
        const result = confirm('Würdest du diese Frage als richtig oder falsch bewerten?');
        if (result) {
            currentScore++;
        } else {
            currentScore--;
        }
        updateScore();
        document.querySelectorAll('.card')[index].style.pointerEvents = 'none'; // Disable clicking
    }
}

function updateScore() {
    const scoreText = document.getElementById('score-text');
    scoreText.innerText = `${currentScore} / ${currentTotal}`;

    if (currentScore === currentTotal) {
        alert('YIPIE');
    }
}

document.getElementById('test-subject-select').addEventListener('change', startTest);
