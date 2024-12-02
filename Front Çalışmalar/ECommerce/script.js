document.addEventListener("DOMContentLoaded", () => {
    // Navbar bağlantılarında aktif linki bulma
    const navLinks = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname;

    // Aktif navbar linkini işaretleme
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });

    // Sidebar ve navbar işlemleri
    const sidebar = document.getElementById("sidebar");
    const toggleSidebar = document.getElementById("toggleSidebar");
    const closeSidebar = document.getElementById("closeSidebar");
    const navbar = document.querySelector(".navbar");

    // Sidebar görünürlüğünü açma/kapama işlemi
    const toggleSidebarVisibility = () => {
        const isSidebarOpen = sidebar.style.left === "0px";
        sidebar.style.left = isSidebarOpen ? "-250px" : "0px";
        navbar.classList.toggle("hidden", !isSidebarOpen);  // Navbar'ı gizle
        navbar.classList.toggle("blurred", !isSidebarOpen); // Navbar'a blur efekti uygula
    };

    // Sidebar'ı açıp kapama işlevi
    toggleSidebar.addEventListener("click", toggleSidebarVisibility);

    // Sidebar'ı kapatma işlevi
    closeSidebar.addEventListener("click", () => {
        sidebar.style.left = "-250px";
        navbar.classList.remove("hidden");  // Navbar'ı tekrar göster
        navbar.classList.remove("blurred"); // Blur efektini kaldır
    });

    // Sidebar dışında bir yere tıklanırsa sidebar'ı kapatma
    document.addEventListener("click", (e) => {
        if (!sidebar.contains(e.target) && e.target !== toggleSidebar) {
            sidebar.style.left = "-250px";
            navbar.classList.remove("hidden");
            navbar.classList.remove("blurred");
        }
    });

    // Navbar "E-Commerce" başlığını ortalamak için navbar-brand'a stil ekliyoruz
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        navbarBrand.style.position = 'absolute';
        navbarBrand.style.left = '50%';
        navbarBrand.style.transform = 'translateX(-50%)';
    }

    // Basit form doğrulama
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Formun yenilenmesini engelle

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                alert("Please fill out all fields!");
                return;
            }

            alert("Message successfully sent!");
            form.reset(); // Formu sıfırla
        });
    }
});
