document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const searchButton = document.getElementById('searchButton');
    const nearbyButton = document.getElementById('nearbyButton');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            alert(result.message);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.token) {
                localStorage.setItem('token', result.token);
                alert('Login successful');
                window.location.href = 'bookstores.html';
            } else {
                alert(result.message);
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', async () => {
            const searchInput = document.getElementById('searchInput').value;
            const response = await fetch(`/api/bookstores/search?name=${searchInput}`);
            const bookstores = await response.json();
            displayBookstores(bookstores);
        });
    }

    if (nearbyButton) {
        nearbyButton.addEventListener('click', async () => {
            const postcodeInput = document.getElementById('postcodeInput').value;
            const response = await fetch(`/api/bookstores/nearby?postcode=${postcodeInput}`);
            const bookstores = await response.json();
            displayBookstores(bookstores);
        });
    }
});

function displayBookstores(bookstores) {
    const bookstoreList = document.getElementById('bookstoreList');
    bookstoreList.innerHTML = '';
    bookstores.forEach(bookstore => {
        const div = document.createElement('div');
        div.textContent = `${bookstore.name} - ${bookstore.city}`;
        bookstoreList.appendChild(div);
    });
}
