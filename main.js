async function logQuestion() {
    const response = await fetch("https://quizapi.io/api/v1/questions?apiKey=2MH0Jpu6URIG3NzwrIbqE72NooCkio2A4Zvsdm55&category=code&difficulty=Easy&limit=10&tags=HTML");
    const questions = await response.json();
    console.log(questions);
    
    const main = document.querySelector("main");
    main.innerHTML = '';  // Clear main content before adding questions
    
    questions.forEach((question, index) => {
        main.innerHTML += `
            <div class="question-block">
                <h2>${question.question}</h2>
                ${Object.keys(question.answers).map((key, i) => `
                    <ul>
                    <li><input type="radio" name="question${index}" class="Question" id="question${index}_answer${i}" value="${key}"
                    <label for="question${index}_answer${i}">${escapeHtml(question.answers[key])}</label></li><br>
                    </ul>
                `).join('')}
                <button type="button" class="submit" data-index="${index}">Submit Answer</button>
            </div>
        `;
    });

    const submitButtons = document.querySelectorAll(".submit");

    submitButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const questionIndex = event.target.getAttribute('data-index');
            const selectedAnswer = document.querySelector(`input[name="question${questionIndex}"]:checked`);

            if (selectedAnswer) {
                const answerKey = selectedAnswer.value;
                const isCorrect = questionIndex !== null && questions[questionIndex].correct_answers[`${answerKey}_correct`] === "true";
                
                if (isCorrect) {
                    selectedAnswer.parentElement.style.accentColor = "greenyellow";
                } else {
                    selectedAnswer.parentElement.style.accentColor = "red";
                }
            }
        });
    });
}

function escapeHtml(text) {
    if(text === null) return;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

logQuestion();
