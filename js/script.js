let countries, questionNum, correctAnswers, answers;

let res = countriesByCapital.map(x =>
  Object.assign(x, {
    continent: countriesByContinent.find(y => y.country === x.country).continent
  })
);

function start() {
  resetState();
  document.getElementById("menu").className = "d-none";
  document.getElementById("game-view").className = "d-block";
  let continent = document.getElementById("continent-select").value;

  if (continent.length > 0) {
    questions = res.filter(obj => obj.continent === continent);
  } else {
    questions = res;
  }

  nextQuestion();
  getAlternatives(questions[0].city);
}

function nextQuestion() {
  document.getElementById("question").innerHTML =
    questionNum +
    1 +
    ". What's the capital in " +
    questions[questionNum].country;
  getAlternatives();
}

function getAlternatives() {
  let alternatives = [];
  while (alternatives.length < 3) {
    let randomItem = Math.floor(Math.random() * questions.length);

    if (alternatives.indexOf(questions[randomItem].city) === -1) {
      alternatives.push(questions[randomItem].city);
    }
  }

  // insert right answer in random position
  alternatives.splice(
    Math.floor(Math.random() * (alternatives.length + 1)),
    0,
    questions[questionNum].city
  );

  let html = "";
  alternatives.forEach(alternative => {
    html +=
      '<button class="btn btn-secondary w-50" onclick="checkAnswer(\'' +
      alternative +
      "')\">" +
      alternative +
      "</button>";
  });

  document.getElementById("alternatives").innerHTML = html;
}

function checkAnswer(answer) {
  answers.push(answer);

  if (answer == questions[questionNum].city) {
    correctAnswers++;
  }

  document.getElementById("correct-answers").innerHTML =
    "Correct answers: " + correctAnswers + " / " + questions.length;
  questionNum++;

  if (answers.length < questions.length) {
    nextQuestion();
  } else {
    resetState();
  }
}

function resetState() {
  questions = [];
  answers = [];
  questionNum = 0;
  correctAnswers = 0;
  document.getElementById("menu").className = "d-block";
  document.getElementById("game-view").className = "d-none";
}
