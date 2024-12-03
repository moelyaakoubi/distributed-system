const API_URL = "http://localhost:8000";
const API_URL1 = "https://56ba-176-183-113-247.ngrok-free.app";
const API_URL4 = "https://d98f-194-199-84-88.ngrok-free.app"


// Fetch all personnel
async function fetchPersonnel() {
    try {
        const response = await fetch(`${API_URL}/personnel`,
            {
                method: "get",
                headers: new Headers({
                  "ngrok-skip-browser-warning": "true",
                }),
            }
        );
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
    fetch(`${API_URL}/relevessanitaires`,
        {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "true",
            }),
        }
    )
        .then(response => response.json())
        .then(data => displayResults(data, "Sanitary Readings"))
        .catch(error => displayError(error));
}

// Fetch all articles
function fetchArticles() {
    fetch(`${API_URL}/articleschainemontage`,
        {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "true",
            }),
        }
    )
        .then(response => response.json())
        .then(data => displayResults(data, "Articles List"))
        .catch(error => displayError(error));
}

// Create a new article
function createArticle() {
    const article = {
        IdentifiantProduit: 105,
        Zone: 1548,
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
            "ngrok-skip-browser-warning": "true"
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


async function fetchHighestMotivationFormation() {
    try {
        const [response1, response2] = await Promise.all([
            fetch(`${API_URL}/forma_max_motivation`, {
                method: "get",
                headers: new Headers({
                  "ngrok-skip-browser-warning": "true",
                }),
            }),
            fetch(`${API_URL4}/forma_max_motivation`, {
                method: "get",
                headers: new Headers({
                  "ngrok-skip-browser-warning": "true",
                }),
            })
        ]);

        if (!response1.ok || !response2.ok) {
            throw new Error(`HTTP error! Status: ${response1.status} ${response2.status}`);
        }

        const [data1, data2] = await Promise.all([response1.json(), response2.json()]);

        const allFormations = [...data1,...data2]

        console.log(allFormations);

        const highestMotivationFormation = allFormations.reduce((prev, current) => {
            return (prev.PourcentageEngagement > current.PourcentageEngagement) ? prev : current;
        });

        displayCardResult(highestMotivationFormation);
    } catch (error) {
        displayError(error.message);
    }
}

function displayCardResult(data) {
    const cardElement = document.querySelector(".card-rh .value");
    cardElement.innerHTML = `${data.PourcentageEngagement}%`;
    const descriptionElement = document.querySelector(".card-rh .description");
    descriptionElement.innerHTML = `${data.NomFormation}`;
}


async function articleAyantMinCollision() {
    try {
        const [response1, response2] = await Promise.all([
            fetch(`${API_URL}/Commercial/A`, {
                method: "get",
                headers: new Headers({
                  "ngrok-skip-browser-warning": "true",
                }),
            }),
            fetch(`${API_URL1}/Commercial/A`, {
                method: "get",
                headers: new Headers({
                  "ngrok-skip-browser-warning": "true",
                }),
            })
        ]);

        if (!response1.ok || !response2.ok) {
            throw new Error(`HTTP error! Status: ${response1.status} ${response2.status}`);
        }

        const [data1, data2] = await Promise.all([response1.json(), response2.json()]);

        const articles = [...data1,...data2]

        console.log(articles);

        const articleAyantMinCollision = articles.reduce((prev, current) => {
            return (prev.Collisions > current.Collisions) ? prev : current;
        });

        displayArticleAyantMinCollisionCardResult(articleAyantMinCollision);
    } catch (error) {
        displayError(error.message);
    }
}

function displayArticleAyantMinCollisionCardResult(data) {
    const cardElement = document.querySelector(".card-commercial .value");
    cardElement.innerHTML = `${data.IdentifiantProduit}`;
    const descriptionElement = document.querySelector(".card-commercial .description");
    descriptionElement.innerHTML = `${data.Collisions}`;
}
