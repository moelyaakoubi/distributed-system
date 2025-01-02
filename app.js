// Déclaration des URLs de base pour l'API
const API_URL = "http://localhost:8000";  // Serveur local
const API_URL1 = "https://56ba-176-183-113-247.ngrok-free.app"; // Proxy via ngrok
const API_URL4 = "https://d98f-194-199-84-88.ngrok-free.app" // Second proxy via ngrok


// Fonction pour récupérer tous les personnels
async function fetchPersonnel() {
    try {
        const response = await fetch(`${API_URL}/personnel`,
            {
                method: "get",
                headers: new Headers({
                  "ngrok-skip-browser-warning": "true",// En-tête pour ignorer les avertissements ngrok
                }),
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Conversion de la réponse en JSON
        displayResults(data, "Personnel List");
    } catch (error) {
        displayError(error.message);
    }
}



// Fonction pour récupérer toutes les relevés sanitaires
function fetchSanitaryReadings() {
    fetch(`${API_URL}/relevessanitaires`,
        {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "true",// En-tête pour ignorer les avertissements ngrok
            }),
        }
    )
        .then(response => response.json())
        .then(data => displayResults(data, "Sanitary Readings"))
        .catch(error => displayError(error));
}

// Fonction pour récupérer tous les articles de la chaîne de montage
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

// Fonction pour créer un nouvel article
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

// Fonction pour afficher les résultats dans une section de la page
function displayResults(data, title) {
    const resultArea = document.getElementById("response");
    resultArea.innerHTML = `<h3>${title}</h3>${JSON.stringify(data, null, 2)}`;
}

// Display errors
function displayError(error) {
    const resultArea = document.getElementById("response");
    resultArea.innerHTML = `<h3>Error</h3><pre>${error}</pre>`;
}

// Fonction pour récupérer la formation RH avec le plus haut engagement en parcourant les deux serveurs
async function fetchHighestMotivationFormation() {
    try {
        // Envoi des requêtes vers les 3 serveurs simultanément
        const [response1, response2] = await Promise.all([
            fetch(`${API_URL}/forma_max_motivation`, {
                method: "get",
                headers: new Headers({
                  "ngrok-skip-browser-warning": "true",// Contourne l'avertissement ngrok
                }),
            }),
            fetch(`${API_URL4}/forma_max_motivation`, {
                method: "get",
                headers: new Headers({
                  "ngrok-skip-browser-warning": "true",
                }),
            })
        ]);

        // Vérification si les réponses sont valides
        if (!response1.ok || !response2.ok) {
            throw new Error(`HTTP error! Status: ${response1.status} ${response2.status}`);
        }

        // Récupération des données depuis les 2 réponses
        const [data1, data2] = await Promise.all([response1.json(), response2.json()]);

        // Combinaison des données des différents serveurs
        const allFormations = [...data1,...data2]// Fusion des données

        console.log(allFormations);

        // Trouver la formation avec le plus haut pourcentage d'engagement
        const highestMotivationFormation = allFormations.reduce((prev, current) => {
            return (prev.PourcentageEngagement > current.PourcentageEngagement) ? prev : current;
        });

        // Affichage des résultats dans l'interface utilisateur
        displayCardResult(highestMotivationFormation);
    } catch (error) {
        displayError(error.message);
    }
}

// Fonction pour afficher le résultat de fetchHighestMotivationFormation() dans l'interface
function displayCardResult(data) {
    const cardElement = document.querySelector(".card-rh .value");
    cardElement.innerHTML = `${data.PourcentageEngagement}%`;
    const descriptionElement = document.querySelector(".card-rh .description");
    descriptionElement.innerHTML = `${data.NomFormation}`;
}

// Fonction pour récupérer l'article avec le moins de collisions en parcourant les deux serveurs
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

        // Trouver l'article avec le moins de collisions
        const articleAyantMinCollision = articles.reduce((prev, current) => {
            return (prev.Collisions > current.Collisions) ? prev : current;
        });

        displayArticleAyantMinCollisionCardResult(articleAyantMinCollision);
    } catch (error) {
        displayError(error.message);
    }
}

// Fonction pour afficher les informations de l'article dans une carte
function displayArticleAyantMinCollisionCardResult(data) {
    const cardElement = document.querySelector(".card-commercial .value");
    cardElement.innerHTML = `Article: ${data.IdentifiantProduit}`;
    const descriptionElement = document.querySelector(".card-commercial .description");
    descriptionElement.innerHTML = `Collisions: ${data.Collisions}`;
}
