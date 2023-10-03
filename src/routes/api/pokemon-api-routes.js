const express = require("express");
const { getPokemonByDexNumber, getAllPokemon, writePokemonByJson } = require("../../db/pokemon-db");
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
        //res.sendStatus(404);
        res.status(404).send({result:`Pokemon (dexNumber:${queryDexNumber}) not Found!`});
    }
});

router.get("/addNewPoke/:newPokeJson", function (req, res) {
    let message = "";
    try {
      const allPokemons = getAllPokemon();
      //const allPokemonsJson = JSON.parse(allPokemons);
      const newPokeJson = JSON.parse(req.params.newPokeJson);
      allPokemons.push(newPokeJson);
      
      console.log(allPokemons.length);
      console.log(allPokemons[allPokemons.length-1]);
      writePokemonByJson(allPokemons);
      message = `add #${newPokeJson.dexNumber} ${newPokeJson.name} successfully!`;
      res.status(200).send({result:`${message}`});
    } catch (error) {
      console.log(error);
      res.status(404).send({result:`${error}`});
    }
  });

module.exports = router;
