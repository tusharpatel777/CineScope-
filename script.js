
const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputbox = document.querySelector('.inputbox');

const getMovieInfo = async (movie) => {
    try {
        const Myapikey = "a2aef93f";
        const url = `http://www.omdbapi.com/?apikey=${Myapikey}&t=${movie}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Unable to fetch movie data");
        }
        const data = await response.json();
        console.log(data);
        showMovieData(data);
    } catch (error) {
        showErrorMessage("No movie found!!");
    }
};

const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');
    const movieGenre = document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML = `
        <h2>${Title}</h2>
        <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>
    `;

    movieGenre.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenre.appendChild(p);
    });
    movieElement.appendChild(movieGenre);

    movieElement.innerHTML += `
        <p><strong>Released Date: </strong>${Released}</p>
        <p><strong>Duration: </strong>${Runtime}</p>
        <p><strong>Actors: </strong>${Actors}</p>
        <p><strong>Plot: </strong>${Plot}</p>
    `;

    const moviePoster = document.createElement('div');
    moviePoster.classList.add('movie-poster');
    moviePoster.innerHTML = `<img src="${Poster}" alt="${Title} poster"/>`;

    movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(movieElement);
};

const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBg');
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = inputbox.value.trim();
    if (movieName !== '') {
        getMovieInfo(movieName);
    } else {
        showErrorMessage("Enter Movie Name to get movie information");
    }
});
