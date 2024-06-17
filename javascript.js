let currentQuestionIndex = 0;
let questions = [];
let score = 0;

async function logQuestion() {
    const response = await fetch("https://quizapi.io/api/v1/questions?apiKey=mDGC0RdZZy77EtYTNMd2OlIag6BEQ9JN2bqWfHiO&difficulty=Easy&limit=10&tags=JavaScript");
    questions = await response.json();
    console.log(questions);
    displayQuestion(currentQuestionIndex);
}

function displayQuestion(index) {
    const main = document.querySelector("main");
    main.innerHTML = '';

    const question = questions[index];
    main.innerHTML += `
        <div class="question-block">
            <p>Question <em>${index + 1}</em> of 10</p>
            <h2>${question.question}</h2>
            ${Object.keys(question.answers).map((key, i) => question.answers[key] ? `
                <ul>
                <li><input type="radio" name="question${index}" class="Question" id="question${index}_answer${i}" value="${key}">
                <label for="question${index}_answer${i}">${escapeHtml(question.answers[key])}</label></li><br>
                </ul>
            ` : '').join('')}
            <button type="button" class="submit" data-index="${index}">Submit Answer</button>
        </div>
    `;

    const submitButton = document.querySelector(".submit");
    submitButton.addEventListener('click', (event) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
    
        if (selectedAnswer) {
            const answerKey = selectedAnswer.value;
            const isCorrect = questions[index].correct_answers[`${answerKey}_correct`] === "true"; // Adjust this line
    
            // Update styles based on correctness
            if (isCorrect) {
                selectedAnswer.parentElement.style.accentColor = "greenyellow"; // Example style change
                score++;
            } else if (isCorrect !== "true" || isCorrect === "true") {
                selectedAnswer.parentElement.style.accentColor = "red"; // Example style change
            }
    
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    displayQuestion(currentQuestionIndex);
                } else {
                    displayResults();
                }
            }, 1000);
        } else {
            alert("Please select an answer before submitting!");
        }
    });
}

function displayResults() {
    const main = document.querySelector("main");
    main.innerHTML = `
        <p class="completed">Quiz completed <strong>You scored ${score}</strong></p>
        <section class="result">
            <div class="chose">            
                <img src="./public/JS.png" alt="html">
                <h2>Javascript</h2>
            </div>  
            <p class="score">${score}</p>
            <p class="out">out of 10</p>
        </section>
        <button onclick="restartQuiz()" class="again">Play again</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    logQuestion();
}

function escapeHtml(text) {
    if (text === null) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

logQuestion();
