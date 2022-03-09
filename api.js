const LoadSport = () => {
  fetch("https://www.thesportsdb.com/api/v1/json/2/all_leagues.php")
    .then((res) => res.json())
    .then((data) => displaySport(data.leagues));
};

const mainTeam = document.getElementById("team");
// console.log(mainTeam);
const displaySport = (dataTeam) => {
  // console.log(dataTeam);
  for (const data of dataTeam) {
    // console.log(data);
    const div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.innerHTML = `
          <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header">${data.strLeague}</div>
            <div class="card-body">
              <h5 class="card-title">${data.strLeagueAlternate}</h5>
              <p class="card-text">${data.idLeague}</p>
          </div>
        `;

    mainTeam.appendChild(div);
  }
};

const queryTeam = () => {
  const inputField = document.getElementById("input-field");
  const inputId = inputField.value;
  // console.log(inputId);
  findTeam(parseInt(inputId));

  inputField.value = "";
};

const findTeam = (input) => {
  mainTeam.textContent = "";
  fetch("https://www.thesportsdb.com/api/v1/json/2/all_leagues.php")
    .then((res) => res.json())
    .then((data) => {
      const allTeam = data.leagues;
      console.log(allTeam);
      const singleTeam = allTeam.find((team) => team.idLeague == input);
      console.log(singleTeam);

      const h3 = document.getElementById("error");
      if (singleTeam == undefined) {
        h3.innerText = "No result Found";
        return;
      }
      h3.innerText = "";

      const div = document.createElement("div");
      div.textContent = "";
      div.classList.add("col-lg-4");
      div.innerHTML = `
          <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header">${singleTeam.strLeague}</div>
            <div class="card-body">
              <h5 class="card-title">${singleTeam.strLeagueAlternate}</h5>
              <p class="card-text">${singleTeam.idLeague}</p>
          </div>
        `;

      mainTeam.appendChild(div);
    });
};
