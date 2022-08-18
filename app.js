const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Création de l'app Express
const app = express();

// Import des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Utilisation de dotenv
dotenv.config();

// Connection à la base de données MongoDB
mongoose.connect((process.env.MONGO_URI),
    { useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
;

// Headers pour contourner les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Conversion de la requête
app.use(express.json());

// Routes de l'API
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;