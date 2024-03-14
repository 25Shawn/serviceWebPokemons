const express = require('express');
const router = express.Router();    
const pokemon = require('../controllers/controllerPokemons.js');


// //liste des pokemons
router.get('/liste', (req, res) => {

    pokemon.AfficherListePokemons(req, res);
});

//un pokemon
router.get('/:id', (req, res) => {
    
    pokemon.AfficherUnPokemon(req, res);
});

// //ajouter un pokemon
router.post('', pokemon.AjouterUnPokemon);

//modifier un pokemon
router.put('/:id', pokemon.ModifierUnPokemon);

//supprimer un pokemon
router.delete('/:id', pokemon.SupprimerUnPokemon);

// On exporte le router pour pouvoir l'utiliser dans index.js
module.exports = router;