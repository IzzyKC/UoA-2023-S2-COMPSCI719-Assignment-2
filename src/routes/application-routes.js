const express = require("express");
const { getAllPokemon, writePokemonByJson } = require("../db/pokemon-db");
const router = express.Router();

router.get("/", function (req, res) {
  // TODO Add necessary data to res.locals before rendering the "home" page.
  const allPokemons = getAllPokemon();
  console.log(allPokemons.length);
  //all pokemon list
  res.locals.allPokemons = allPokemons;
  //pick last index as my favorite pokemon
  const favoritePokemonDetail = allPokemons[allPokemons.length-1];
  res.locals.detailImg = favoritePokemonDetail.imageUrl;
  res.locals.dexNumber = favoritePokemonDetail.dexNumber;
  res.locals.name = favoritePokemonDetail.name;
  res.locals.types = favoritePokemonDetail.types.toString();
  res.locals.about = favoritePokemonDetail.nmae;
  res.locals.dexEntry = favoritePokemonDetail.dexEntry;

  /*
  console.log("19"+req.cookies.addNewPokeMessage);
  res.locals.addPokemonMessage = req.cookies.addNewPokeMessage;
  res.clearCookie("addNewPokeMessage");
  */

  res.render("home");
});

router.get("/addNewPoke/:newPokeJson", function (req, res) {
  let message = "";
  try {
    const newPokeJson = JSON.parse(req.params.newPokeJson);
    console.log(newPokeJson);
    console.log(newPokeJson.dexNumber);
    console.log(newPokeJson.name);
    //writePokemonByJson(newPokeJson);
    message = `add #${newPokeJson.dexNumber} ${newPokeJson.name} successfully!`;
  } catch (error) {
    message = error;
    console.log(error);
  }finally{
    console.log(message);
    res.redirect("/");
  }
});

module.exports = router;
