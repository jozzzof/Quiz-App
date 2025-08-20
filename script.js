fetch("https://opentdb.com/api.php?amount=1&difficulty=medium&type=boolean")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    data.results.forEach((q) => {
      const quizCategory = document.getElementById("question-category");
      const quizQuestion = document.getElementById("question-text");
      const trueButton = document.getElementById("true-button");
      const falseButton = document.getElementById("false-button");
      const questionAnswer = document.getElementById("question-answer");

      quizCategory.innerHTML = `Category: ${q.category}`;
      quizQuestion.innerHTML = q.question;

      trueButton.addEventListener("click", () => {
        if (q.correct_answer == "True") {
          questionAnswer.innerHTML = "You got a correct answer!";
        } else {
          questionAnswer.innerHTML = "You got a wrong answer!";
        }
      });

      falseButton.addEventListener("click", () => {
        if (q.correct_answer == "False") {
          questionAnswer.innerHTML = "You got a correct answer!";
        } else {
          questionAnswer.innerHTML = "You got a wrong answer!";
        }
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching data", error);
  });
