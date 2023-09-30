const express = require("express");
const { getAllPokemon } = require("../db/pokemon-db");
const router = express.Router();

router.get("/", function (req, res) {
  // TODO Add necessary data to res.locals before rendering the "home" page.
  const allPokemons = getAllPokemon();
  console.log(allPokemons.length);
  //console.log(allPokemons);
  console.log(allPokemons[1]);
  res.locals.allPokemons = allPokemons;
  res.locals.selectedPokemon = allPokemons[1];
  res.locals.typesString = allPokemons[1].types.toString();
  res.render("home");
});

module.exports = router;
