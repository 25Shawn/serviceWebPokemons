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
router.post('', (req,res) => {
    pokemon.AjouterUnPokemon(req, res);
});

//modifier un pokemon
router.put('/:id',(req,res)=>{ 
    pokemon.ModifierUnPokemon(req,res);

});

//supprimer un pokemon
router.delete('/:id',(req,res)=>{

    pokemon.SupprimerUnPokemon(req,res);
});

// On exporte le router pour pouvoir l'utiliser dans index.js
module.exports = router;