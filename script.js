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
    `<div class="card" id="movie${i}" style="width: 18rem; opacity: 0.3">
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








const createObserver = () => {
  const makeCardAppear = (entries, observer) => {
    entries.forEach(entry => {
      entry.target.style = "width: 18rem; opacity: 1";
    });
  };
  for (i = 0 ; i < divToGet.length ; i++) {

    const options = {
      root: document.getElementById(`movie${i}`),
      rootMargin: '0px',
      threshold: 0.8
    }
    
    const observer = new IntersectionObserver(makeCardAppear, options);
    
    const target = document.getElementById(`movie${i}`);
    console.log(target)
    
    observer.observe(target);
  }
};

document.getElementById('submit-btn').addEventListener('click', movieApi);


  // var targetElement;
  // var numSteps = 20.0;
  // var noOpacity = "1";
  

  // window.addEventListener("load", function(event) {
  //   targetElement = document.querySelector('#movie3');
  //   console.log(targetElement)
  //   createObserver();
  // }, false);
  

  // function createObserver() {
  //   var observer;

  //   var options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 1.0
  //   };

  //   observer = new IntersectionObserver(handleIntersect, options);
  //   console.log(targetElement);
  //   observer.observe(targetElement);
  // }

  // function handleIntersect(entries, observer) {
  //   entries.forEach(function(entry) {
  //     entry.target.style.opacity = noOpacity;
  //   });
  // }





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