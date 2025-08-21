function playGame() {
  function fetchCondition() {
    fetch("https://opentdb.com/api.php?amount=1&difficulty=medium&type=boolean")
      .then((response) => {
        if (!response.ok) {
          const quizCategory = document.getElementById("question-category");
          const quizQuestion = document.getElementById("question-text");
          const questionAnswer = document.getElementById("question-answer");
          let score = document.getElementById("score");
          const buttonContainer = document.querySelectorAll(".answer-button");

          quizCategory.innerHTML = `Category: Loading, Please Wait...`;
          quizQuestion.innerHTML = `Question: Loading, Please Wait...`;
          fetchCondition();
        }
        return response.json();
      })
      .then((data) => {
        data.results.forEach((q) => {
          const quizCategory = document.getElementById("question-category");
          const quizQuestion = document.getElementById("question-text");
          const questionAnswer = document.getElementById("question-answer");
          let score = document.getElementById("score");
          const buttonContainer = document.querySelectorAll(".answer-button");

          quizCategory.innerHTML = `Category: ${q.category}`;
          quizQuestion.innerHTML = `Question: ${q.question}`;

          buttonContainer.forEach((button) => {
            button.addEventListener("click", () => {
              console.log(button.textContent);
              if (q.correct_answer == button.textContent) {
                button.classList.add("correct-button");
                questionAnswer.innerHTML = "You got a correct answer!";
                score.innerHTML = Number(score.textContent) + 1;
              } else {
                button.classList.add("wrong-button");
                questionAnswer.innerHTML = "You got a wrong answer!";
                score.innerHTML = Number(score.textContent) - 1;
              }
            });
          });
          nextQuestion();
        });
      });
  }
  fetchCondition();
}

function nextQuestion() {
  const nextQuestionButton = document.getElementById("next-question-button");
  nextQuestionButton.addEventListener("click", () => {
    playGame();
  });
}
