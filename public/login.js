loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch('http://localhost:3000/api/auth/login', {
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
