async function movieApi (event) {
  event.preventDefault();
  var keyword = document.getElementById('formInput').value;
  const response1 = await fetch(`http://www.omdbapi.com/?apikey=758f13f9&s=${keyword}`);
  const moviesList = await response1.json();
  console.log(moviesList);
  var resultsSection = document.getElementById('searchResultsList');
  for (i = 0 ; i < moviesList.Search.length ; i++) {
    const { Poster, Title, imdbID } = moviesList.Search[i];
    getReleaseDate(imdbID);


    resultsSection.innerHTML +=

    `<div class="card" style="width: 18rem;">
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

  async function getReleaseDate (id) {
    const response2 = await fetch(`http://www.omdbapi.com/?apikey=758f13f9&i=${id}`);
    const theReleaseDate = await response2.json();
    const { Released } = theReleaseDate
    var releaseParagraph = document.getElementById(`${id}`)
    releaseParagraph.innerHTML += `Released : ${Released}`
  }




}

document.getElementById('submit-btn').addEventListener('click', movieApi);