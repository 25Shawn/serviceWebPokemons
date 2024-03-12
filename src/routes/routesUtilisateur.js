const utilisateur = require('../controllers/constrollerUtilisateur');
const express = require('express');
const router = express.Router(); 


router.post('/ajouter', (req, res) => {

    utilisateur.AjouterUtilisateur(req, res);
});

router.get('/cle', (req, res) => {
    
    utilisateur.recupererCle(req, res);
});

exports.router = router;