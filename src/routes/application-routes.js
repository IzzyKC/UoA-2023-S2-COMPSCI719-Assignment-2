const express = require("express");
const { getAllPokemon } = require("../db/pokemon-db");
const router = express.Router();

router.get("/", function (req, res) {
  // TODO Add necessary data to res.locals before rendering the "home" page.
  const allPokemons = getAllPokemon();
  console.log(allPokemons.length);
  //pick favorite pokemon randomly
  const randomFavoritePokemonIndex = Math.floor((Math.random() * allPokemons.length));
  console.log(allPokemons[randomFavoritePokemonIndex]);
  //all pokemon list
  res.locals.allPokemons = allPokemons;
  //details: favorite pokemon(randomly pick index)
  res.locals.favoritePokemon = allPokemons[randomFavoritePokemonIndex];
  //convert types array to string
  res.locals.typesString = allPokemons[randomFavoritePokemonIndex].types.toString();
  res.render("home");
});

module.exports = router;
