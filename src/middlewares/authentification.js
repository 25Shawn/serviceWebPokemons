const utilisateur = require('../models/modelUtilisateur.js');

module.exports = (req, res, next) => {
    
    if (!req.headers.authorization) {
        return res.status(401).send("Vous devez fournir une clé api");
    }

    const cleApi = req.headers.authorization.split(' ')[1];

    utilisateur.verifierCle(cleApi)
        .then((resultat) => {
            if (!resultat) {
                return res.status(401).send("Clé API invalide");
            }	
            next();
            
        })
        .catch((erreur) => {
            console.log('Erreur: ', erreur);
            return res.status(500).send("Erreur lors de la validation de la clé api");
        });
}

