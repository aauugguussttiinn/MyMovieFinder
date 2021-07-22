var movies_url = `http://www.omdbapi.com/?apikey=758f13f9&`


async function movieApi() {
  const await fetch(movies_url);
  const moviesList = await response.json();
  console.log(moviesList);
}

document.getElementById('submit-btn').addEventListener(click, movieApi());