
// Fonction pour récupérer les KPI depuis l'API
async function fetchKPIs() {
    try {
        const response = await fetch('http://localhost:3000/api/kpis');
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');
        const data = await response.json();
        updateDashboard(data);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Fonction pour mettre à jour le tableau de bord
function updateDashboard(kpis) {
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = `
        <div class="card">
            <h3>Commercial</h3>
            <div class="value">${kpis.commercial.article}</div>
            <div class="description">Article ayant subi le moins de collisions</div>
        </div>
        <div class="card">
            <h3>Ressources humaines</h3>
            <div class="value">${kpis.rh.motivation}</div>
            <div class="description">Est la formation avec le plus haut pourcentage de motivation</div>
        </div>
        <div class="card">
            <h3>Assistance commerciale</h3>
            <div class="value">${kpis.assistance.responsables}</div>
            <div class="description">Nombre de responsables en vente</div>
        </div>
        <div class="card">
            <h3>Maintenance</h3>
            <div class="value">${kpis.maintenance.incendies}</div>
            <div class="description">Zones avec un incendie en cours</div>
        </div>
        <div class="card">
            <h3>Recherche & Développement</h3>
            <div class="value">${kpis.rnd.emballages_deformes}</div>
            <div class="description">Articles avec emballage déformé sans collision</div>
        </div>
        <div class="card">
            <h3>Qualité</h3>
            <div class="value">${kpis.qualite.emballages_corrects}</div>
            <div class="description">Articles ayant un emballage correct</div>
        </div>
        <div class="card">
            <h3>Analyse des données</h3>
            <div class="value">${kpis.analyse.max_collisions}</div>
            <div class="description">Nombre maximum de collisions pour articles avec emballage</div>
        </div>
    `;
}

// Appeler la fonction pour charger les KPI au démarrage
fetchKPIs();