const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import du modèle User
const User = require('../models/User');

// Utilisation de email-validator
const emailValidator = require('email-validator');

// Créer un compte utilisateur
exports.signup = (req, res, next) => {
    if (emailValidator.validate(req.body.email)) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        } else {
            res.status(400).json({ error: `Le format de l'adresse email est invalide.` })
        }
};

// Se connecter à son compte utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect' });
                        } else {
                            res.status(200).json({ 
                                userId: user._id, 
                                token: jwt.sign(
                                    { userId: user._id },
                                    'SECRET_TOKEN',
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};