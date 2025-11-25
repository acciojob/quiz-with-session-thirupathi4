// Store user answers in sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("answers")) || [];

// Function to render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear old content if any

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      if (userAnswers[i] === choice) {
        radio.checked = true; // restore previous selection
      }

      radio.addEventListener("change", (e) => {
        userAnswers[i] = e.target.value;
        sessionStorage.setItem("answers", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.textContent = choice;

      questionDiv.appendChild(radio);
      questionDiv.appendChild(label);
    }

    questionsElement.appendChild(questionDiv);
  }
}

renderQuestions();

// Submit button logic
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});
