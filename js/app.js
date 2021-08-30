
const spinner = document.getElementById('spinner');
spinner.style.display = 'none';


const section = document.getElementById('leauges')
const loadLeagues = () => {
    spinner.style.display = 'block';
    fetch(`https://www.thesportsdb.com/api/v1/json/1/all_leagues.php`)
        .then(res => res.json())
        .then(data => displayLeagues(data.leagues))

}
loadLeagues()

const displayLeagues = leagues => {
    leagues.forEach(league => {
        spinner.style.display = 'none';
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
             <div class="card border border-2 border-warning bg-info fw-bold h-100 p-3 m-2">
                  <h3 class="text-white my-3">${league.strLeague}</h3>
                  <h4>${league.strLeagueAlternate}</h4>
                  <h4>Type: ${league.strSport}</h4>
             </div>
        `
        section.appendChild(div);
    })

}

const teamBox = document.getElementById('teams');
const errorField = document.getElementById('error');
error.style.display = 'none';



const loadTeam = async () => {
    section.style.display = 'none';
    spinner.style.display = 'block';
    const serachField = document.getElementById('input');
    const searchText = serachField.value;
    serachField.value = '';
    if (searchText == '') {
        errorField.style.display = 'block';
        spinner.style.display = 'none';
        teamBox.textContent = '';
    }
    else {
        try {
            errorField.style.display = 'none';
            const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
            const res = await fetch(url);
            const data = await res.json();
            displayTeam(data.teams)
        }
        catch (error) {
            spinner.style.display = 'none';
            errorField.style.display = 'block';
        }
    }
}


const displayTeam = teams => {
    teamBox.textContent = '';
    teams.forEach(team => {
        errorField.style.display = 'none'
        spinner.style.display = 'none';
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
           <div class="card h-100 bg-secondary p-4 shadow sahdow-lg">
              <div class="card-body">
                  <img class="w-50 mx-auto d-block" src="${team.strTeamBadge}">
                  <h5 class="card-title text-warning fw-bold">Team: ${team.strTeam}</h5>
                  <h6 class="card-title text-warning fw-bold">Stadium: ${team.strStadium}</h6>
                  <h6 class="card-title text-warning fw-bold">Stadium: ${team.strLeague}</h6>
                  <p class="card-text text-white fw-bold">${team.strStadiumDescription?.slice(0, 100)}</p>
              </div>
           </div>
        `
        teamBox.appendChild(div);
    })
}