let score = 0;
let scoreText = document.getElementById("score");
let currentQuestion = null;

function scoreIncrease() {
  score++;
  scoreText.innerHTML = score;
}

function scoreDecrease() {
  if (score != 0) {
    score--;
    scoreText.innerHTML = score;
  }
}

function loadingAnswer() {
  const quizCategory = document.getElementById("question-category");
  const quizQuestion = document.getElementById("question-text");

  quizCategory.innerHTML = `Category: Loading, Please Wait...`;
  quizQuestion.innerHTML = `Question: Loading, Please Wait...`;
}

function displayQuestion(questionData) {
  const quizCategory = document.getElementById("question-category");
  const quizQuestion = document.getElementById("question-text");

  quizCategory.innerHTML = `Category: ${questionData.category}`;
  quizQuestion.innerHTML = `Question: ${questionData.question}`;
}

function buttonHandling() {
  const nextQuestionButton = document.getElementById("next-question-button");
  const questionAnswer = document.getElementById("question-answer");
  const buttonContainer = document.getElementById("button-container");

  buttonContainer.addEventListener("click", (event) => {
    if (!currentQuestion) return;

    if (event.target.classList.contains("answer-button")) {
      const clickedButton = event.target.textContent;

      if (currentQuestion.correct_answer === clickedButton) {
        event.target.classList.add("correct-button");
        questionAnswer.innerHTML = "You got a correct answer!";
        scoreIncrease();
      } else {
        event.target.classList.add("wrong-button");
        questionAnswer.innerHTML = "You got a wrong answer!";
        scoreDecrease();
      }

      nextQuestionButton.style.visibility = "visible";

      document
        .querySelectorAll(".answer-button")
        .forEach((btn) => (btn.disabled = true));
    }
  });
}

function fetchCondition() {
  const nextQuestionButton = document.getElementById("next-question-button");
  nextQuestionButton.style.visibility = "hidden";
  fetch("https://opentdb.com/api.php?amount=1&difficulty=medium&type=boolean")
    .then((response) => {
      if (!response.ok) {
        loadingAnswer();
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      currentQuestion = data.results[0];
      displayQuestion(currentQuestion);
    })

    .catch(() => {
      setTimeout(fetchCondition, 5000);
    });
}

function nextQuestion() {
  const nextQuestionButton = document.getElementById("next-question-button");
  const questionAnswer = document.getElementById("question-answer");
  const buttonContainer = document.querySelectorAll(".answer-button");

  nextQuestionButton.addEventListener("click", () => {
    questionAnswer.innerHTML = "";

    buttonContainer.forEach((button) => {
      button.classList.remove("wrong-button");
      button.classList.remove("correct-button");
      button.disabled = false;
    });
    fetchCondition();
    nextQuestionButton.style.visibility = "hidden";
  });
}

fetchCondition();
buttonHandling();
nextQuestion();
