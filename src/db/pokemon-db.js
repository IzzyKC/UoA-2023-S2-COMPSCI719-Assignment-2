const { readJson } = require("./db.js");
const path = require("path");

const POKEMON_FILE_NAME = path.join(__dirname, "../json/pokemon.json");

function getAllPokemon() {
  return readJson(POKEMON_FILE_NAME);
}

function getPokemonByDexNumber(dexNumber) {
  const list = getAllPokemon();
  return list.find((p) => p.dexNumber == dexNumber);
}

module.exports = {
  getAllPokemon,
  getPokemonByDexNumber,
};
