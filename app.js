const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://CamLin:HTdfd25kkhwCZKa@cluster0.e9fmqr1.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);

app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({ message: 'Objet créé !' });
});

app.get('/api/sauces', (req, res, next) => {
    const sauces = [
        {
            userId: '',
            name: 'Nom de la sauce',
            manufactured: 'Fabriquant de la sauce',
            description: 'Description de la sauce',
            mainPepper: 'Ingrédient piquant principal de la sauce',
            imageUrl: '',
            heat: 'Nbr entre 1 et 10 indiquant la force de la sauce',
            likes: 'Nbr de users qui like la sauce',
            dislikes: 'Nbr de users qui like pas la sauce',
            usersLiked: '',
            usersDisliked: '',
        },
    ];
    res.status(200).json(sauces);
});

module.exports = app;