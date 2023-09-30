const express = require("express");
const { getPokemonByDexNumber } = require("../../db/pokemon-db");
const router = express.Router();

// TODO Add an API endpoint here.
// When sending a GET request for /:dexNumber (:dexNumber is a path param),
// return the JSON representation of the correct Pokemon, or return a 404 error
// if that Pokemon is not found.
router.get('/:dexNumber', function (req, res){
    const queryDexNumber =  req.params.dexNumber;
    console.log(queryDexNumber);
    const pokemonData = getPokemonByDexNumber(queryDexNumber);
    console.log(pokemonData);
    if(pokemonData){
        res.status(200).json(pokemonData);
    }else{
        res.status(404).send(`pokemon (dexNumber:${queryDexNumber}) not Found!`);
    }
});

module.exports = router;
