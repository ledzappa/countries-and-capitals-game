const r1 = new XMLHttpRequest();
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

  questions = shuffleArray(questions);

  nextQuestion();
  getAlternatives(questions[0].city);
}

function nextQuestion() {
  document.getElementById("heading").innerHTML = questions[questionNum].country;
  getAlternatives();
  getGiphy(questions[questionNum].country);
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

function renderAlternatives(extraClass) {
  let html = "";
  alternatives.forEach((alternative, index) => {
    html +=
      '<div class="col-6' +
      (index === 0 || index === 2 ? " pr-1" : " pl-1") +
      '"><button id="alternative-' +
      index +
      '" class="btn btn-secondary' +
      (extraClass ? " " + extraClass : "") +
      '" onclick="checkAnswer(\'' +
      index +
      "')\">" +
      alternative +
      "</button></div>";
  });

  document.getElementById("alternatives").innerHTML = html;
}

function checkAnswer(answer) {
  answers.push(alternatives[answer]);

  renderAlternatives("no-click");

  if (alternatives[answer] == questions[questionNum].city) {
    document.getElementById("alternative-" + answer).className =
      "btn btn-success no-click";
    correctAnswers++;
  } else {
    document.getElementById("alternative-" + answer).className =
      "btn btn-danger no-click";
  }

  document.getElementById("correct-answers").innerHTML =
    "Correct answers: " + correctAnswers + " / " + questions.length;
  questionNum++;

  if (answers.length < questions.length) {
    setTimeout(() => nextQuestion(), 500);
  } else {
    resetState();
  }
}

function getGiphy(country) {
  const url =
    "https://api.giphy.com/v1/gifs/search?api_key=In5JKoBFt0IN0Ylr1vDbtmPW1nIDNnbk&q=" +
    country +
    "&limit=5&offset=0&lang=en";
  r1.open("GET", url);
  r1.send();
}

function getRandomGiphyImage() {
  let gif =
    "https://media.giphy.com/media/" +
    giphyResponse.data[Math.floor(Math.random() * giphyResponse.data.length)]
      .id +
    "/giphy.gif";
  document.getElementById("giphy").innerHTML = "<img src='" + gif + "'>";
}

function backToMenu() {
  if (confirm("Are you sure?")) {
    resetState();
  }
}

function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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

r1.onreadystatechange = e => {
  if (e.currentTarget.readyState == 4) {
    giphyResponse = JSON.parse(r1.responseText);
    getRandomGiphyImage();
  }
};
