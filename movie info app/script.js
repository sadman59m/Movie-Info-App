//TBDB Api

const apiKey = "api_key=ef64498e81f793cbb78eaef9c83167da";
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = baseUrl + '/search/movie?' + apiKey;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(apiUrl);

function getMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            showMovies(data.results);
        });
}

function showMovies(data) {

    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
        <img
        src="${imgUrl + poster_path}"
        alt="${title}"
    />

    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>

    <div class="overview">
        <h3>Overview</h3>
        ${overview}
    </div>


    `;
        main.appendChild(movieElement);
    });
}

function getColor(rating) {
    if (rating >= 8) return "green";
    else if (rating >= 5) return "orange";
    else return "red";
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchUrl + '&query=' + searchTerm);
    }
    else {
        getMovies(apiUrl);
    }
})