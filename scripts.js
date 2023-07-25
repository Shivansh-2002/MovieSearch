const apiKey = 'cbf5ab5d';

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
            const ul = document.createElement('ul');

            movieResults.forEach((movie) => {
                if (movie.Title.toLowerCase().includes(searchInput)) {
                    const li = document.createElement('li');
                    li.textContent = movie.Title;
                    ul.appendChild(li);
                }
            });

            if (ul.childElementCount === 0) {
                searchResultsDiv.innerHTML = 'No results found.';
            } else {
                searchResultsDiv.appendChild(ul);
            }
        } else {
            searchResultsDiv.innerHTML = 'No results found.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        searchResultsDiv.innerHTML = 'An error occurred. Please try again later.';
    }
}
