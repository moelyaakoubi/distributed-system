const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'user',
    database: 'projet_application_repartie'
});

// connection.connect(err => {
//     if (err) {
//         console.error('Erreur de connexion :', err);
//         return;
//     }
//     connection.query('SELECT * FROM personnel', (err, results) => {
//         if (err) {
//             console.error('Erreur lors de la récupération des données :', err);
//             return;
//         }
//         console.table(results);
//     });
//     connection.end();
// });

connection.connect(err => {
    if (err) {
        console.error('Erreur de connexion :', err);
        return;
    }
    console.log('Connexion réussie à MySQL !');
});


const insertionQuery = `INSERT INTO personnel (NomPrenom, Etat, Service, FrequenceCardiaqueActuelle, Position)
 VALUES (?, ?, ?, ?, ?)`;
const data = ['Ahmed Hassan', 'actif', 'maintenance', 10, '29.9789, 31.1342'];

connection.query(insertionQuery, data, (err, results) => {
    if (err) {
        console.error('Erreur lors de l\'insertion :', err);
        return;
    }
    console.log('Données insérées avec succès :', results);
});
connection.end();



// const updateQuery = `UPDATE evolutions_populations SET population = ?, taux_croissance =
// ? WHERE annee = ?`;
// const updateData = [110000, 4.8, 2024];
// connection.query(updateQuery, updateData, (err, results) => {
//     if (err) {
//         console.error('Erreur lors de la mise à jour :', err);
//         return;
//     }
//     console.log('Mise à jour réussie :', results);
// });
// connection.end();

// const deleteQuery = `DELETE FROM evolutions_populations WHERE annee = ?`;
// const deleteData = [2024];
// connection.query(deleteQuery, deleteData, (err, results) => {
//     if (err) {
//         console.error('Erreur lors de la suppression :', err);
//         return;
//     }
//     console.log('Enregistrement supprimé avec succès :', results);
// });

// connection.end();