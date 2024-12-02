document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:5192/api/Auth/Login', {
            username,
            password
        });

        // Login başarılı
        alert(response.data.message || "Login successful!");
        window.location.href = "/dashboard.html";
    } catch (error) {
        // Hata durumunu kontrol et
        if (error.response && error.response.data) {
            document.getElementById('error-message').textContent = error.response.data.message || 'Login failed.';
        } else {
            document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
        }
    }
});
