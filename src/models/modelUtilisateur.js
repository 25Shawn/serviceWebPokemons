const sql = require('../config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const costFactor = 10;

class Utilisateur {
    constructor(nom, courriel, motDePasse) {
        this.nom = nom;
        this.courriel = courriel;
        this.motDePasse = motDePasse;
    }

    static ajoutuser(nom, courriel, motDePasse){

        return new Promise((resolve, reject) => {
    
            const cleApi = uuidv4();
        
            if (!nom || !motDePasse) {
                reject("Veuillez remplir tous les champs");
            }
    
    
            Utilisateur.verifieCourriel(courriel)
            .then(courrielExiste => {
                if (courrielExiste) {
                    reject("Le courriel existe déjà");
                } else {
                    return bcrypt.hash(motDePasse, costFactor);
                }
            })
            .then(hash => {
                const requete = `INSERT INTO utilisateur (nom, courriel, mot_de_passe, cle_api) VALUES (?, ?, ?, ?);`;
                const params = [nom, courriel, hash, cleApi];

                sql.query(requete, params, (erreur, resultat) => {
                    if (erreur) {
                        console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                        reject(erreur);
                    } else {
                        const message = {
                            "message": "L'utilisateur a été créé",
                            "cle_api": `${cleApi}`
                        };

                        console.log(JSON.stringify(message));
                        resolve(message);
                    }
                });
            })
            .catch(erreur => {
                console.log(`Erreur lors du hashage du mot de passe: ${erreur}`);
                reject(erreur);
            });
        });
    }

    static verifierCle(cleApi) {
        return new Promise((resolve, reject) => {
            const requete = `SELECT COUNT(*) AS nbUsagers FROM utilisateur WHERE cle_api = ?;`;
            const params = [cleApi];
    
            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                } else {
                    resolve(resultat[0].nbUsagers > 0);
                }
            });
        });
    }


    static verifieCourriel(courriel){
        return new Promise((resolve, reject) => {
    
            const requete = `SELECT COUNT(*) AS nbUsagers FROM utilisateur WHERE courriel = ?;`;
            const params = [courriel];
    
            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                } else {
    
                    resolve(resultat[0].nbUsagers > 0);
                }
            });
        });
    }

    static cleapi(nouvelle, courriel, motDePasse) {
        return new Promise((resolve, reject) => {
            if (nouvelle === 1) {
                const nouvelleCleApi = uuidv4();
                
                bcrypt.hash(motDePasse, costFactor)
                    .then(hash => {
                        const updateQuery = `UPDATE utilisateur SET cle_api = ? WHERE courriel = ? AND mot_de_passe = ?;`;
                        const updateParams = [nouvelleCleApi, courriel, hash];
    
                        sql.query(updateQuery, updateParams, (updateError, updateResult) => {
                            if (updateError) {
                                console.log(`Erreur sqlState ${updateError.sqlState} : ${updateError.sqlMessage}`);
                                reject(updateError);
                            } else {
                                resolve(nouvelleCleApi);
                            }
                        });
                    })
                    .catch(hashError => {
                        console.log(`Erreur lors du hashage du mot de passe: ${hashError}`);
                        reject(hashError);
                    });
            } else {
                const selectQuery = `SELECT cle_api, mot_de_passe FROM utilisateur WHERE courriel = ?;`;
                const selectParams = [courriel];
    
                sql.query(selectQuery, selectParams, (selectError, selectResult) => {
                    if (selectError) {
                        console.log(`Erreur sqlState ${selectError.sqlState} : ${selectError.sqlMessage}`);
                        reject(selectError);
                    } else {
                        if (selectResult.length > 0) {
                            const storedHash = selectResult[0].mot_de_passe;
                            bcrypt.compare(motDePasse, storedHash)
                                .then(passwordMatch => {
                                    if (passwordMatch) {
                                        resolve(selectResult[0].cle_api);
                                    } else {
                                        reject("Mot de passe incorrect");
                                    }
                                })
                                .catch(compareError => {
                                    console.log(`Erreur lors de la comparaison des mots de passe: ${compareError}`);
                                    reject(compareError);
                                });
                        } else {
                            reject("Utilisateur non trouvé");
                        }
                    }
                });
            }
        });
    }
}

module.exports = Utilisateur;



