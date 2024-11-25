const API_URL = "http://127.0.0.1:8000";  // Update this if the backend URL is different

// Fetch all personnel
async function fetchPersonnel() {
    try {
        const response = await fetch(`${API_URL}/personnel`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayResults(data, "Personnel List");
    } catch (error) {
        displayError(error.message);
    }
}



// Fetch all sanitary readings
function fetchSanitaryReadings() {
    fetch(`${API_URL}/relevessanitaires`)
        .then(response => response.json())
        .then(data => displayResults(data, "Sanitary Readings"))
        .catch(error => displayError(error));
}

// Fetch all articles
function fetchArticles() {
    fetch(`${API_URL}/articleschainemontage`)
        .then(response => response.json())
        .then(data => displayResults(data, "Articles List"))
        .catch(error => displayError(error));
}

// Create a new article
function createArticle() {
    const article = {
        IdentifiantProduit: 101,
        Zone: 2,
        EtatEmballage: "Correct",
        Responsable: 123456789012345,
        Position: "29.9789,31.1342",
        Rotation: "0,45,90",
        Collisions: 0
    };

    fetch(`${API_URL}/articleschainemontage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(article)
    })
    .then(response => response.json())
    .then(data => displayResults(data, "Created Article"))
    .catch(error => displayError(error));
}

// Display results in the page
function displayResults(data, title) {
    const resultArea = document.getElementById("response");
    resultArea.innerHTML = `<h3>${title}</h3>${JSON.stringify(data, null, 2)}`;
}

// Display errors
function displayError(error) {
    const resultArea = document.getElementById("response");
    resultArea.innerHTML = `<h3>Error</h3><pre>${error}</pre>`;
}
