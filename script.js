divToGet = [];

async function movieApi (event) {
  event.preventDefault();
  var keyword = document.getElementById('formInput').value;
  const response1 = await fetch(`http://www.omdbapi.com/?apikey=758f13f9&s=${keyword}`);
  const moviesList = await response1.json();
  var resultsSection = document.getElementById('searchResultsList');
  resultsSection.innerHTML = '';
  for (i = 0 ; i < moviesList.Search.length ; i++) {
    const { Poster, Title, imdbID } = moviesList.Search[i];
    getReleaseDate(imdbID);
    resultsSection.innerHTML +=
    `<div class="card" style="width: 18rem; opacity: 0">
      <img class="card-img-top" src="${Poster}" alt="Poster img">
      <div class="card-body">
        <h5 class="card-title">${Title}</h5>
        <p class="card-text" id="${imdbID}"></p>
      </div>
      <div class="card-body">
        <button class="btn btn-primary" id="movie${i}" onclick="popupDisplay(${i})">Read More</button>
      </div>
    </div>
    <div id="myModal${i}" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div class="card bg-dark text-white">
          <img class="card-img" src="${Poster}" alt="Card image">
          <div class="card-img-overlay">
            <h5 class="card-title">${Title}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">Last updated 3 mins ago</p>
          </div>
        </div>
      </div>
    </div>
    </br>`
    divToGet.push(`movie${i}`)
  }
  createObserver()
}

async function getReleaseDate (id) {
  const response2 = await fetch(`http://www.omdbapi.com/?apikey=758f13f9&i=${id}`);
  const theReleaseDate = await response2.json();
  const { Released } = theReleaseDate
  var releaseParagraph = document.getElementById(`${id}`)
  releaseParagraph.innerHTML += `Released : ${Released}`
}


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


function popupDisplay(i) {
  console.log("ça marche wesh");
  var modal = document.getElementById(`myModal${i}`);
  var span = document.getElementsByClassName("close")[0];
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

