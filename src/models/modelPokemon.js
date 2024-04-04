const sql = require("../config/db");

class Pokemon{
    constructor(id){
        this.id = id;
    }

    static RequeteUnPokemon = (id) =>{
        return new Promise((resolve, reject) => {

            const requete = "SELECT * FROM pokemon WHERE id = $1";
            const params = [id];

            sql.query(requete, params, (erreur, resultat) => {

                if (erreur) {
                    console.error("Erreur SQL lors de la récupération du pokemon avec l'id", id, erreur);
                    reject(erreur);

                } else {
                    console.log("Résultat de la requête pour le pokemon avec l'id", id, ":", resultat);
                    resolve(resultat.rows);

                }

            });
        });

    }
}

class ListePokemon {
    constructor(type, page) {
        this.type = type;
        this.page = page;
    }

    static RequeteListePokemons = (params) => {
        return new Promise((resolve,reject) => {
            let requete = 'SELECT * FROM pokemon WHERE type_primaire = $1 LIMIT 25 OFFSET $2';
            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log("Erreur: ", erreur);
                    reject(erreur);
                } 
                console.log("Résultat de la requête pour la liste des pokemons de type", params[0], ":", resultat);
                resolve(resultat.rows);
            });
        });
    }

    static RequeteListePokemonsSansType = (params) => {
        return new Promise((resolve, reject) => {
            let requete = 'SELECT * FROM pokemon LIMIT 25 OFFSET $1';
            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log("Erreur: ", erreur);
                    reject(erreur);
                } 
                console.log("Résultat de la requête pour la liste de tous les pokemons:", resultat);
                resolve(resultat.rows);
            });
        });
    }
}

class AjouterUnPokemon{
    constructor(nom, type_primaire, type_secondaire, pv,attaque,defense){
        this.nom = nom;
        this.type_primaire = type_primaire;
        this.type_secondaire = type_secondaire;
        this.pv = pv;
        this.attaque = attaque;
        this.defense = defense;
    }

    static RequeteAjouterUnPokemon = (params) => {
        return new Promise((resolve, reject) => {
            const requete = `INSERT INTO pokemon (nom, type_primaire, type_secondaire,pv,attaque,defense) VALUES ($1,$2,$3,$4,$5,$6)`;

            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log("Erreur: ", erreur);
                    reject(erreur);
                } else {
                    resolve(resultat.rows);
                }
            });
        });
    }

}

class ModifierUnPokemon{
    constructor(nom, type_primaire, type_secondaire, pv,attaque,defense, id){
        this.nom = nom;
        this.type_primaire = type_primaire;
        this.type_secondaire = type_secondaire;
        this.pv = pv;
        this.attaque = attaque;
        this.defense = defense;
        this.id = id;
    }
    

    static RequeteModifierUnPokemon = (params) => {
        return new Promise((resolve, reject) => {
            const requete = `UPDATE pokemon SET nom=$1, type_primaire=$2, type_secondaire=$3, pv=$4, attaque=$5, defense=$6 WHERE id=$7`;

            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log("Erreur: ", erreur);
                    reject(erreur);
                } else {
                    resolve(resultat.rows);
                }
            });
        });
    }
}

class SupprimerUnPokemon{
    constructor(id){
        this.id = id;
    }

    static RequeteSupprimerUnPokemon = (id) => {
        return new Promise((resolve, reject) => {
            const requete = `DELETE FROM pokemon WHERE id=$1`;

            sql.query(requete, id, (erreur, resultat) => {
                if (erreur) {
                    console.log("Erreur: ", erreur);
                    reject(erreur);
                } else {
                    resolve(resultat.rows);
                }
            });
        });
    }
}

module.exports = {Pokemon, ListePokemon, AjouterUnPokemon, ModifierUnPokemon};
