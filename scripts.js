const apiKey = 'cbf5ab5d';
document.getElementById('searchInput').addEventListener('keydown', function(event) {
    // console.log("it is the key, ",event.key);
    if (event.key === 'Enter') {
        searchMovies();
    }
});

async function searchMovies() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    if (!searchInput) {
        searchResultsDiv.innerHTML = 'Please enter a movie name.';
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchInput)}`);
        const data = await response.json();

        if (data.Response === 'True') {
            const movieResults = data.Search;

            if (movieResults.length === 0) {
                searchResultsDiv.innerHTML = 'No results found.';
            } else {
                const movieCards = movieResults.map(createMovieCard);
                movieCards.forEach(card => searchResultsDiv.appendChild(card));
            }
        } else {
            searchResultsDiv.innerHTML = 'No results found.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        searchResultsDiv.innerHTML = 'An error occurred. Please try again later.';
    }
}

function createMovieCard(movie) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('movie-card');

    const titleElement = document.createElement('p');
    titleElement.textContent = movie.Title;
    titleElement.classList.add('movie-title');

    const posterElement = document.createElement('img');
    posterElement.src = (movie.Poster=="N/A")?"nothingToSee.png":movie.Poster;
    posterElement.alt = movie.Title;
    posterElement.classList.add('movie-poster');


    cardDiv.appendChild(titleElement);
    cardDiv.appendChild(posterElement);

    return cardDiv;
}
