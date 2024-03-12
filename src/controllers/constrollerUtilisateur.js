const user = require('../models/modelUtilisateur.js');

exports.AjouterUtilisateur = (req, res) => {

    const params = [req.body.nom, req.body.courriel, req.body.mot_de_passe];

    user.ajoutuser(req.body.nom, req.body.courriel, req.body.mot_de_passe)
        .then(resultat => {
            if (resultat.length === 0) {

                return res.status(404).send(`L'utilisateur ${req.params.nom} n'a pas été ajouté`);
            } else {

                return res.status(200).json(resultat);
            }
        })
        .catch(erreur => {

            console.log("Erreur: ", erreur);
            return res.status(500).send("Echec lors de la création de l'utilisateur");
        });
}

exports.recupererCle = (req, res) => {

    user.cleapi(req.query.nouvelle, req.body.courriel, req.body.mot_de_passe)
        .then(resultat => {
            if (resultat.length === 0) {
                return res.status(404).send(`L'utilisateur ${req.params.nom} n'a pas été trouvé`);
            } else {
                return res.status(200).json(resultat);
            }
        })
        .catch(erreur => {
            console.log("Erreur: ", erreur);
            return res.status(500).send("Echec lors de la récupération de la clé api");
        });
}

