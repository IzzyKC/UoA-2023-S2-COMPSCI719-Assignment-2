const express = require("express");
const { getAllPokemon, writePokemonByJson } = require("../db/pokemon-db");
const router = express.Router();

router.get("/", function (req, res) {
  // TODO Add necessary data to res.locals before rendering the "home" page.
  const allPokemons = getAllPokemon();
  console.log(allPokemons.length);
  //all pokemon list
  res.locals.allPokemons = allPokemons;
  //const randomFavoritePokemonIndex = Math.floor((Math.random() * allPokemons.length));
  //console.log(allPokemons[randomFavoritePokemonIndex]);
  //details: favorite pokemon(randomly pick index)
  //pick last index as my favorite pokemon
  const favoritePokemonDetail = allPokemons[allPokemons.length-1];
  res.locals.detailImg = favoritePokemonDetail.imageUrl;
  res.locals.dexNumber = favoritePokemonDetail.dexNumber;
  res.locals.name = favoritePokemonDetail.name;
  res.locals.types = favoritePokemonDetail.types.toString();
  res.locals.about = favoritePokemonDetail.nmae;
  res.locals.dexEntry = favoritePokemonDetail.dexEntry;
  res.render("home");
});

router.get("/addNewPoke/:newPokeJson", function (req, res) {
  try {
    const newPokeJson = JSON.parse(req.params.newPokeJson);
    console.log(newPokeJson);
    res.locals.dexNumber = newPokeJson.dexNumber;
    res.locals.addPokemonMessage = newPokeJson.name;
  } catch (error) {
    res.locals.addPokemonMessage = error;
    console.log(error);
  }finally{
    console.log("finally");
    //res.redirect("/?resut=");
    res.render("home");
  }
});

module.exports = router;
