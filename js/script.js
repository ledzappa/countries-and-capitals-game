const merge = [];

let res = countriesByCapital.map(x =>
  Object.assign(x, {
    continent: countriesByContinent.find(y => y.country === x.country)
      .continent
  })
);

function start() {
  let continent = document.getElementById("continent-select").value;

  if (continent.length > 0) {
    console.log(res.filter(obj => obj.continent === continent));
    console.log(res);
  }
}
