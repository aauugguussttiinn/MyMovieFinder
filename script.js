divToGet = [];

async function movieApi (event) {
  event.preventDefault();
  var keyword = document.getElementById('formInput').value;
  const response1 = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`);
  const moviesList = await response1.json();
  var resultsSection = document.getElementById('searchResultsList');
  resultsSection.innerHTML = '';
  for (i = 0 ; i < moviesList.Search.length ; i++) {
    const { Poster, Title, imdbID } = moviesList.Search[i];
    getReleaseDate(imdbID);
    resultsSection.innerHTML +=
    `<div class="card" id="modal${imdbID}" style="width: 18rem; opacity: 0">
      <img class="card-img-top" src="${Poster}" alt="Poster img">
      <div class="card-body">
        <h5 class="card-title">${Title}</h5>
        <p class="card-text" id="release${imdbID}"></p>
      </div>
      <div class="card-body">
        <button class="btn btn-primary" id="${imdbID}" onclick="popupDisplay(this.id, ${i})">Read More</button>
      </div>
    </div>
    </br>`
    divToGet.push(`movie${i}`)
  }
  createObserver()
}

async function getReleaseDate (id) {
  const response2 = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
  const movieData = await response2.json();
  const { Released, Title, Plot, Poster, Country, Runtime, Year } = movieData
  var releaseParagraph = document.getElementById(`release${id}`)
  releaseParagraph.innerHTML += `Released : ${Released}`
  var divForModalDisplay = document.getElementById(`modal${id}`)
  divForModalDisplay.innerHTML +=
  `<div id="myModal${id}" class="modal">
    <div class="modal-content d-flex justify-content-between">
      <span class="close m-2">&times;</span>
      <div class="d-flex align-items-center row m-2">
        <img class="col d-flex justify-content-center" src="${Poster}" alt="Card image" style="width: 18rem">
        <div class="col align-self-start">
            <h3 class="text-primary">${Title}</h3>
            <p class="">${Plot}</p>
            <p class="">${Country}, ${Year}</p>
            <p class="">${Runtime}</p>
        </div>
      </div>
      <div></div>
    </div>
  </div>`
}

//close d-flex justify-content-end
// ------------------------- PROGRESSIVE LOADING OF MOVIES -------------------------

const createObserver = () => {
    const showCard = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.8) entry.target.style = "width: 18rem; opacity: 1";
      });
    };
    
    var options = {
      threshold: 0.8
    }

    var observer = new IntersectionObserver(showCard, options);
    
    var targets = document.querySelectorAll(`.card`);
    targets.forEach(function (target) {
      observer.observe(target);
    })
};

// ------------------------- MODAL TO SEE MORE DETAILS -------------------------


function popupDisplay(imdbID, i) {
  var modal = document.getElementById(`myModal${imdbID}`);
  var span = document.getElementsByClassName("close")[i];
  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}




document.getElementById('submit-btn').addEventListener('click', movieApi);

