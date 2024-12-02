// Add event listener to the form
document.getElementById('addMovieForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form data
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const releaseDate = document.getElementById('releaseDate').value;
    const genre = document.getElementById('genre').value;

    // Prepare movie data
    const movieData = {
        title: title,
        description: description,
        releaseDate: releaseDate,
        genre: genre
    };

    // Define base API URL
    const API_URL = 'http://localhost:5080/api/movies'; // Doğru portu ve URL'yi kontrol edin

    try {
        // Send POST request with Axios
        const response = await axios.post(API_URL, movieData);

        // Handle response
        const message = document.getElementById('message');
        if (response.data.success) {
            message.textContent = "Film veya Dizi başarıyla eklendi!";
            message.className = 'success';
        } else {
            message.textContent = "Bir hata oluştu. Lütfen tekrar deneyin.";
            message.className = 'error';
        }
        message.classList.remove('hidden');
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        const message = document.getElementById('message');
        message.textContent = "Bir hata oluştu. Lütfen tekrar deneyin.";
        message.className = 'error';
        message.classList.remove('hidden');
    }
});
const API_URL = 'http://localhost:5080/api/movies';

// Film Ekle
document.getElementById('addMovieForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const movieData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        releaseDate: document.getElementById('releaseDate').value,
        genre: document.getElementById('genre').value,
    };
    try {
        const response = await axios.post(API_URL, movieData);
        showMessage(response.data.success ? "Film başarıyla eklendi!" : "Ekleme başarısız.", response.data.success);
    } catch (error) {
        showMessage("Bir hata oluştu.", false);
    }
});

// Film Getir
document.getElementById('getMoviesBtn').addEventListener('click', async function () {
    try {
        const response = await axios.get(API_URL);
        displayMovies(response.data);
    } catch (error) {
        showMessage("Filmler getirilemedi.", false);
    }
});

// Film Sil
async function deleteMovie(id) {
    try {
        await axios.delete(`${API_URL}/${id}`);
        showMessage("Film başarıyla silindi.", true);
        document.getElementById(`movie-${id}`).remove();
    } catch (error) {
        showMessage("Film silinemedi.", false);
    }
}

document.getElementById('deleteMoviesBtn').addEventListener('click', async function () {
    try {
        const response = await axios.get(API_URL);
        displayMovies(response.data, true);
    } catch (error) {
        showMessage("Filmler getirilemedi.", false);
    }
});

// Filmleri Düzenle
document.getElementById('editMoviesBtn').addEventListener('click', function () {
    showMessage("Film düzenleme henüz eklenmedi.", false);
});

// Yardımcı Fonksiyonlar
function displayMovies(movies, allowDelete = false) {
    const dynamicContent = document.getElementById('dynamicContent');
    dynamicContent.innerHTML = movies.map(movie => `
        <div class="movie-item" id="movie-${movie.id}">
            <div>
                <strong>${movie.title}</strong> - ${movie.genre} (${movie.releaseDate})
                <p>${movie.description}</p>
            </div>
            ${allowDelete ? `<button onclick="deleteMovie(${movie.id})">❌ Sil</button>` : ''}
        </div>
    `).join('');
    dynamicContent.style.display = 'block';
}

function showMessage(message, isSuccess) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = isSuccess ? 'success' : 'error';
    messageDiv.classList.remove('hidden');
}
