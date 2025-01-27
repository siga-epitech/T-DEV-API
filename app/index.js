require('dotenv').config(); 
const express = require('express'); 
const app = express(); 

// Route par défaut pour tester le serveur
app.get('/', (req, res) => {
  res.send('Hello, Docker is running!');
});

// Définir le port à utiliser, soit depuis les variables d'environnement, soit 3000 par défaut
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
