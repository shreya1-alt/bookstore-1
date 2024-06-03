searchButton.addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value;
    const response = await fetch(`http://localhost:3000/api/bookstores/search?name=${searchInput}`);
    const bookstores = await response.json();
    displayBookstores(bookstores);
});

nearbyButton.addEventListener('click', async () => {
    const postcodeInput = document.getElementById('postcodeInput').value;
    const response = await fetch(`http://localhost:3000/api/bookstores/nearby?postcode=${postcodeInput}`);
    const bookstores = await response.json();
    displayBookstores(bookstores);
});
