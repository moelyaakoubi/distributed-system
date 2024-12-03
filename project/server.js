const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());


// Exemple de données statiques (remplacez-les par des données dynamiques)
const kpis = {
    commercial: { article: "A123" },
    rh: { motivation: "Sujet commercial" },
    assistance: { responsables: 12 },
    maintenance: { incendies: 3 },
    rnd: { emballages_deformes: 8 },
    qualite: { emballages_corrects: 150 },
    analyse: { max_collisions:  25},
};

// Endpoint pour récupérer les KPI
app.get('/api/kpis', (req, res) => {
    res.json(kpis);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
