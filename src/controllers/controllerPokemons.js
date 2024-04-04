const pokemon = require('../models/modelPokemon.js');

exports.AfficherUnPokemon = (req, res) => {

    pokemon.Pokemon.RequeteUnPokemon(req.params.id)

        .then(resultat => {
            if (resultat.length === 0) {
                return res.status(404).send("Pokemon introuvable avec l'id ${params}");

            } else {
                return res.status(200).send({
                    nom: resultat[0].nom,
                    type_primaire: resultat[0].type_primaire,
                    type_secondaire: resultat[0].type_secondaire,
                    pv: resultat[0].pv,
                    attaque: resultat[0].attaque,
                    defense: resultat[0].defense,
                });
            }
        })
        .catch(erreur => {
            console.log("Erreur: ", erreur);
            return res.status(500).send("Echec lors de la récupération du pokemon avec l'id ${params}");
        });
}

exports.AfficherListePokemons = (req, res) => {
    const page = req.query.page;
    const offset = (page - 1) * 25;

    // Vérifie si le type est spécifié dans la requête
    if (!req.query.type) {
        // Si aucun type n'est spécifié, ajuste les paramètres pour récupérer tous les Pokemons
        const params = [offset];
        // Exécute la requête pour récupérer tous les Pokemons
        pokemon.ListePokemon.RequeteListePokemonsSansType(params)
            .then(resultat => {
                if (resultat.length === 0) {
                   return res.status(404).send(`Aucun pokemon trouvé`);
                } else {
                   return res.status(200).send(resultat);
                }
            })
            .catch(erreur => {
                console.log("Erreur: ", erreur);
                return res.status(500).send("Echec lors de la récupération de la liste des pokemons");
            });
    } else {
        // Si un type est spécifié, procède normalement
        const params = [req.query.type, offset];
        pokemon.ListePokemon.RequeteListePokemons(params)
            .then(resultat => {
                if (resultat.length === 0) {
                   return res.status(404).send(`Aucun pokemon de type ${req.query.type} trouvé`);
                } else {
                   return res.status(200).send(resultat);
                }
            })
            .catch(erreur => {
                console.log("Erreur: ", erreur);
                return res.status(500).send("Echec lors de la récupération de la liste des pokemons");
            });
    }
};


exports.AjouterUnPokemon = (req, res) => {
    
    const params = [req.query.nom, req.query.type_primaire, req.query.type_secondaire, req.query.pv, req.query.attaque, req.query.defense];
    
    pokemon.AjouterUnPokemon.RequeteAjouterUnPokemon(params)
    
        .then(resultat => {
            if(resultat.length === 0){
                return res.status(404).send("Le pokemon id ${req.params.id} n'a pas été ajouté");
            }
            else {
                return res.status(201).send(
                    {
                        message : "Le pokemon ${req.params.nom} a été ajouté avec succès",
                        pokemon : {
                            id: resultat.insertId,
                            nom: req.query.nom,
                            type_primaire: req.query.type_primaire,
                            type_secondaire: req.query.type_secondaire,
                            pv: req.params.pv,
                            attaque: req.params.attaque,
                            defense: req.params.defense
                        }
                    }

                );
            }
        })
        .catch(erreur => {
            return res.status(500).send("Echec lors de la création du pokemon ${req.params.nom}");
        });
        

}

exports.ModifierUnPokemon = (req, res) => {
    
    const params = [req.query.nom, req.query.type_primaire, req.query.type_secondaire, req.query.pv, req.query.attaque, req.query.defense,req.query.id];

    pokemon.ModifierUnPokemon.RequeteModifierUnPokemon(params)
    
        .then(resultat => {
            if(resultat.length === 0){
                return res.status(404).send("Le pokemon id ${req.params.id} n'existe pas dans la base de données");
            }
            else {
                return res.status(201).send("Le pokemon id ${req.params.id} a été modifié avec succès");
            }
        })
        .catch(erreur => {
            console.log("Erreur: ", erreur);
            return res.status(500).send("Echec lors de la modification du pokemon ${req.params.nom}");
        });
}

exports.SupprimerUnPokemon =(req, res) =>{
    const params = [req.query.id];

    pokemon.SupprimerUnPokemon.RequeteSupprimerUnPokemon(params)

        .then(resultat => {
            if(resultat.length === 0){
                return res.status(404).send("Le pokemon id ${req.params.id} n'existe pas dans la base de données");
            }
            else {
                return res.status(201).send("Le pokemon id ${req.params.id} a été supprimé avec succès");
            }
        })
        .catch(erreur => {
            console.log("Erreur: ", erreur);
            return res.status(500).send("Echec lors de la suppression du pokemon ${req.params.nom}");
        });
}