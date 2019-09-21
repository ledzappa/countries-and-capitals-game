let countries, questionNum, correctAnswers, answers, alternatives;

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
  alternatives = [];
  while (alternatives.length < 3) {
    let randomItem = Math.floor(Math.random() * questions.length);

    if (
      alternatives.indexOf(questions[randomItem].city) === -1 &&
      randomItem !== questionNum
    ) {
      alternatives.push(questions[randomItem].city);
    }
  }

  // insert right answer in random position
  alternatives.splice(
    Math.floor(Math.random() * (alternatives.length + 1)),
    0,
    questions[questionNum].city
  );

  renderAlternatives();
}

function renderAlternatives(answer) {
  let html = "";
  alternatives.forEach(alternative => {
    html +=
      '<button id="' +
      alternative +
      '" class="btn btn-secondary w-50" onclick="checkAnswer(\'' +
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
    document.getElementById(answer).className = "btn btn-success w-50";
    correctAnswers++;
  } else {
    document.getElementById(answer).className = "btn btn-danger w-50";
  }

  document.getElementById("correct-answers").innerHTML =
    "Correct answers: " + correctAnswers + " / " + questions.length;
  questionNum++;

  if (answers.length < questions.length) {
    setTimeout(() => nextQuestion(), 1000);
  } else {
    resetState();
  }
}

function resetState() {
  questions = [];
  answers = [];
  alternatives = [];
  questionNum = 0;
  correctAnswers = 0;
  document.getElementById("menu").className = "d-block";
  document.getElementById("game-view").className = "d-none";
}
