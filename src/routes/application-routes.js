const express = require("express");
const { getAllPokemon } = require("../db/pokemon-db");
const router = express.Router();

router.get("/", function (req, res) {
  // TODO Add necessary data to res.locals before rendering the "home" page.
  const allPokemons = getAllPokemon();
  console.log(allPokemons.length);
  //all pokemon list
  res.locals.allPokemons = allPokemons;
  //pick favorite pokemon randomly
  const randomFavoritePokemonIndex = Math.floor((Math.random() * allPokemons.length));
  console.log(allPokemons[randomFavoritePokemonIndex]);
  //details: favorite pokemon(randomly pick index)
  const favoritePokemonDetail = allPokemons[randomFavoritePokemonIndex];
  res.locals.detailImg = favoritePokemonDetail.imageUrl;
  res.locals.dexNumber = favoritePokemonDetail.dexNumber;
  res.locals.name = favoritePokemonDetail.name;
  res.locals.types = favoritePokemonDetail.types.toString();
  res.locals.about = favoritePokemonDetail.nmae;
  res.locals.dexEntry = favoritePokemonDetail.dexEntry;
  res.render("home");
});

module.exports = router;
