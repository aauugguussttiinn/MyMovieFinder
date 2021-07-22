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
        <button class="btn btn-primary" id="" href="#">Read More</button>
      </div>
    </div>
    </br>`
  }
}

async function getReleaseDate (id) {
  const response2 = await fetch(`http://www.omdbapi.com/?apikey=758f13f9&i=${id}`);
  const theReleaseDate = await response2.json();
  const { Released } = theReleaseDate
  var releaseParagraph = document.getElementById(`${id}`)
  releaseParagraph.innerHTML += `Released : ${Released}`
}

document.getElementById('submit-btn').addEventListener('click', movieApi);

var targetElement;
var numSteps = 20.0;
var prevRatio = 0.0;
var noOpacity = "none";

window.addEventListener("load", function(event) {
  targetElement = document.getElementsByClassName('card');

  createObserver();
}, false);



function createObserver() {
  var observer;

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  };

  observer = new IntersectionObserver(handleIntersect, options);
  console.log(targetElement);
  observer.observe(targetElement);
}

function handleIntersect(entries, observer) {
  entries.forEach(function(entry) {
    entry.target.style.opacity = noOpacity;
  });
}



// const observerLauncher = (theId) => {
//   var options = {
//     root: document.querySelector('#searchResultsList'),
//     rootMargin: '0px',
//     threshold: 1.0
//   }
//   var observer = new IntersectionObserver(callback, options);
//   var target = document.querySelector(`#${theId}`);
//   observer.observe(target);
// }