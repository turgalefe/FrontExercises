document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Kullanıcı adı ve şifreyi al
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Login isteğini gönder
        const response = await axios.post('http://localhost:5000/api/Auth/Login', {
            username,
            password
        });

        // Eğer istek başarılıysa
        const data = response.data; // JSON dönen cevap
        alert('Login successful!');
        localStorage.setItem('authToken', data.token); // Token'ı localStorage'a kaydediyoruz
        window.location.href = '/home'; // Örnek: Anasayfaya yönlendirme
    } catch (error) {
        // Hata durumunu yönet
        if (error.response) {
            // Sunucudan dönen hata mesajını al
            document.getElementById('errorMessage').textContent = error.response.data;
        } else {
            // Diğer hata durumları (örneğin, ağ bağlantısı)
            document.getElementById('errorMessage').textContent = 'Something went wrong. Please try again later.';
        }
    }
});
