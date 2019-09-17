let countries, questionNum, correctAnswers;

let res = countriesByCapital.map(x =>
  Object.assign(x, {
    continent: countriesByContinent.find(y => y.country === x.country).continent
  })
);

function start() {
  resetState();
  document.getElementById("menu").className = "d-none";
  let continent = document.getElementById("continent-select").value;

  if (continent.length > 0) {
    countries = res.filter(obj => obj.continent === continent);
  } else {
    countries = res;
  }

  nextQuestion();
  getAlternatives(countries[0].city);
}

function resetState() {
  countries = [];
  questionNum = 0;
  correctAnswers = 0;
}

function nextQuestion() {
  document.getElementById("question").innerHTML =
    questionNum +
    1 +
    ". What's the capital in " +
    countries[questionNum].country;
  getAlternatives();
}

function getAlternatives() {
  let alternatives = [];
  while (alternatives.length < 3) {
    let randomItem = Math.floor(Math.random() * countries.length);

    if (alternatives.indexOf(countries[randomItem].city) === -1) {
      alternatives.push(countries[randomItem].city);
    }
  }

  // insert right answer in random position
  alternatives.splice(
    Math.floor(Math.random() * (alternatives.length + 1)),
    0,
    countries[questionNum].city
  );

  let html = "";
  alternatives.forEach(alternative => {
    html +=
      "<button class=\"btn btn-secondary w-50\" onclick=\"checkAnswer('" +
      alternative +
      "')\">" +
      alternative +
      "</button>";
  });

  document.getElementById("alternatives").innerHTML = html;
}

function checkAnswer(answer) {
  if (answer == countries[questionNum].city) {
    correctAnswers++;
  }

  document.getElementById("correct-answers").innerHTML =
    "Correct answers: " + correctAnswers + " / " + countries.length;
  questionNum++;
  nextQuestion();
}
