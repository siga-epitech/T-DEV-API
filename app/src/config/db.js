const { Pool } = require('pg');

// Configuration de la connexion PostgreSQL avec l'URI de la base de données
const pool = new Pool({
  connectionString: process.env.DB_URI, // Charge DB_URI depuis le .env chargé par index.js
});

// Test de la connexion à la base de données
pool.connect()
  .then(() => console.log('Connexion à PostgreSQL réussie'))
  .catch((err) => console.error('Erreur de connexion à PostgreSQL:', err));

module.exports = pool; // Exporte le pool pour l'utiliser dans les contrôleurs