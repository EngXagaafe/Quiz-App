const questions = [
    {
        question: "Which one of the following is part of a computer?",
        answers: [
            { text: "CPU", correct: true },
            { text: "Mobile", correct: false },
            { text: "Pen", correct: false },
            { text: "Book", correct: false },
        ]
    },
    {
        question: "Which one of the following is part of Animals?",
        answers: [
            { text: "Home", correct: false },
            { text: "City", correct: false },
            { text: "Fish", correct: true },
            { text: "Book", correct: false },
        ]
    },
    {
        question: "Somalia is located in:",
        answers: [
            { text: "Asia", correct: false },
            { text: "America", correct: false },
            { text: "None", correct: false },
            { text: "Africa", correct: true },
        ]
    },
    {
        question: "The capital city of Somalia is:",
        answers: [
            { text: "Hargeisa", correct: false },
            { text: "Mogadishu", correct: true },
            { text: "Bosaso", correct: false },
            { text: "Kismayo", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct; // Set data attribute
        button.addEventListener("click", selectAnswer); // Single event listener
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }

    // Disable all buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; // Disable all buttons
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        nextButton.style.display = "block"; // Show next button
    } else {
        questionElement.innerHTML = `Quiz finished! Your score is: ${score}/${questions.length}`;
        nextButton.style.display = "none";
    }
}

nextButton.addEventListener("click", () => {
    showQuestion();
});

// Start the quiz when the script loads
startQuiz();
