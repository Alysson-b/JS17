const apiKey = '77c4e2b070a2e1396500d0b42ebf7cec'; 
const apiBase = 'https://api.themoviedb.org/3/';
const catalogElement = document.getElementById('catalog');
const detailsElement = document.getElementById('details');
const backButton = document.getElementById('back-btn');

document.addEventListener('DOMContentLoaded', () => {
    loadCatalog();
});

async function loadCatalog() {
    try {
        const response = await fetch(`${apiBase}movie/popular?api_key=${apiKey}&language=pt-BR`);
        if (!response.ok) throw new Error('Erro ao carregar o catálogo.');
        const data = await response.json();
        displayCatalog(data.results);
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar o catálogo. Tente novamente mais tarde.');
    }
}

function displayCatalog(movies) {
    catalogElement.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <p>${movie.title}</p>
        `;
        movieElement.addEventListener('click', () => showDetails(movie));
        catalogElement.appendChild(movieElement);
    });
}

async function showDetails(movie) {
    try {
        const response = await fetch(`${apiBase}movie/${movie.id}?api_key=${apiKey}&language=pt-BR`);
        if (!response.ok) throw new Error('Erro ao carregar detalhes.');
        const data = await response.json();
        displayDetails(data);
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar os detalhes. Tente novamente mais tarde.');
    }
}

function displayDetails(movie) {
    document.getElementById('title').textContent = movie.title;
    document.getElementById('poster').src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    document.getElementById('overview').textContent = movie.overview;
    document.getElementById('release-date').textContent = movie.release_date;
    document.getElementById('rating').textContent = movie.vote_average;
    catalogElement.style.display = 'none';
    detailsElement.style.display = 'block';
}

backButton.addEventListener('click', () => {
    detailsElement.style.display = 'none';
    catalogElement.style.display = 'flex';
});
