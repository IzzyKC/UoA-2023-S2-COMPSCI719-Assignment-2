window.addEventListener("load", function () {
  // TODO Add JavaScript code so that when the user clicks one of the Pokemon buttons,
  // detailed data about that Pokemon will be loaded from your own API, and displayed
  // in the appropriate place on the HTML page (overwriting any data which was already
  // there).
  const btnAddPoke = document.querySelector("#addPokemon");
  const prefix_button = "id-";

  //initialise page
  initialisePage();

  

  btnAddPoke.addEventListener("click", function (event) {
    const newDexNumber = document.querySelector("#txtDexNumber").value;
    console.log(newDexNumber);
    if (validNewDexNumber(newDexNumber)) {
      addNewPokeFromAPI(newDexNumber);
    }
  });

  function initialisePage() {
    const detailDexNumber = document.querySelector("#detail-dexNumber");
    if(detailDexNumber){
      const selectedDexNumber = detailDexNumber.innerText;
      console.log(`initialise detail poke dexNumber: ${selectedDexNumber}`);
      //add selected class to selected pokemon button
      addSelectedClassToButton(`${prefix_button}${selectedDexNumber}`);
    }
    allPokeButtonClickEventListener();
  }

  function allPokeButtonClickEventListener(){
    const allPokeBtns = document.querySelectorAll(".btn-pokemon");
    if(!allPokeBtns) return;
    console.log(`all pokemon buttons: ${allPokeBtns.length}`);
    //add pokemon buttons click event
    for (let i = 0; i < allPokeBtns.length; i++) {
      allPokeBtns[i].addEventListener("click", function (event) {
      //const dexNumber = allPokeBtns[i].value;
      const dexNumber = allPokeBtns[i].dataset.dexNumber;
      console.log(`btn-dex-number: ${dexNumber}`);
      setUpDetailsByDexNumber(dexNumber);
    });
  }

  }

  function validNewDexNumber(strDexNumber) {
    const intDexNumber = parseInt(strDexNumber);
    const errMsg = document.querySelector("#errMsg");
    //clear error messaeg
    errMsg.innerText = "";
    if (Number.isNaN(intDexNumber) || strDexNumber.indexOf(".") >= 0) {
      errMsg.innerText = "Invalid input! Please enter a valid dexNumber from Interger 1 to 1010!";
      return false;
    } else if (intDexNumber < 1 || intDexNumber > 1010) {
      errMsg.innerText = "Out of range! Please enter a valid dexNumber from Interger 1 to 1010!";
      return false;
    } else {
      const repeatPokemon = document.querySelector(`#${prefix_button}${strDexNumber}`);
      if (repeatPokemon) {
        errMsg.innerText = `#${strDexNumber} already exist! Please try again!`;
        return false;
      }
    }
    return true;
  }

  async function addNewPokeFromAPI(dexNumber) {
    const newPokemonJson = await getNewPokeFromAPI(dexNumber);
    const addNewPokeResponseObj = await fetch(`./api/pokemon/addNewPoke/${encodeURIComponent(JSON.stringify(newPokemonJson))}`);
    const addNewPokeResponseJson = await addNewPokeResponseObj.json();
    if (addNewPokeResponseObj.ok) {
      addNewPokemonButton(newPokemonJson);
      updateSelectedPokemonDetails(newPokemonJson);
    }
    document.querySelector("#errMsg").innerText = JSON.stringify(addNewPokeResponseJson.result);
  }

  function addNewPokemonButton(newPokemonJson) {
    const btnContainer = document.querySelector(".sprite-container");
    const newPokeButton = document.createElement("button");
    newPokeButton.id = `${prefix_button}${newPokemonJson.dexNumber}`;
    newPokeButton.classList.add("btn-pokemon");
    //newPokeButton.value = newPokemonJson.dexNumber;
    newPokeButton.dataset.dexNumber = newPokemonJson.dexNumber;
    const image = document.createElement("img");
    image.src = newPokemonJson.smallImageUrl;
    newPokeButton.appendChild(image);
    const span = document.createElement("span");
    span.innerText = newPokemonJson.name;
    newPokeButton.appendChild(span);
    newPokeButton.addEventListener("click", function(event){
      setUpDetailsByDexNumber(newPokemonJson.dexNumber);
    }); 
    btnContainer.appendChild(newPokeButton);
  }

  async function getNewPokeFromAPI(dexNumber) {
    const pokemon = await fetchPokemonFromAPI(dexNumber);
    console.log(pokemon);
    const pokeSpecies = await fecthPokeSpeciesFromAPI(dexNumber);
    console.log(pokeSpecies);
    const name = pokemon.species.name;
    const smallImageUrl = pokemon.sprites.front_default;
    //if no images exists, use small image instead
    const imageUrl = pokemon.sprites.other.home.front_default ?
      pokemon.sprites.other.home.front_default : pokemon.sprites.front_default;
    const latestFlavorText = getLatestFlavorText(pokeSpecies.flavor_text_entries);
    const newPoke = {
      dexNumber: parseInt(dexNumber),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      imageUrl: imageUrl,
      smallImageUrl: smallImageUrl,
      types: makeTypesArray(pokemon.types),
      dexEntry: latestFlavorText
    };

    //check data content
    console.log(newPoke);
    //console.log(JSON.stringify(newPoke));
    return newPoke;
  }

  function makeTypesArray(types) {
    const typesArray = [];
    for (let i = 0; i < types.length; i++) {
      typesArray[i] = types[i].type.name;
    }
    return typesArray;
  }

  function getLatestFlavorText(flavor_text_entries) {
    let latestFlavorText = "";
    for (let i = flavor_text_entries.length - 1; i >= 0; i--) {
      if (flavor_text_entries[i].language.name == "en") {
        latestFlavorText = flavor_text_entries[i].flavor_text;
        break;
      }
    }
    //console.log(latestFlavorText);
    latestFlavorText = latestFlavorText.replaceAll("\n", " ");
    console.log(latestFlavorText);
    return latestFlavorText;
  }

  async function fetchPokemonFromAPI(dexNumber) {
    const pokemonResponseObj = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
    const pokemonJson = await pokemonResponseObj.json();
    return pokemonJson;
  }

  async function fecthPokeSpeciesFromAPI(dexNumber) {
    const pokeSpeciesResponseObj = await fetch(` https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`);
    const pokemonSpeciesJson = await pokeSpeciesResponseObj.json();
    return pokemonSpeciesJson;
  }

  async function setUpDetailsByDexNumber(dexNumber) {
    const detailsJson = await fetchDetailsByDexNumber(dexNumber);
    //update details div
    if (detailsJson) {
      updateSelectedPokemonDetails(detailsJson);
    }
  }

  async function fetchDetailsByDexNumber(dexNumber) {
    const detailsResponseObj = await fetch(`./api/pokemon/${dexNumber}`);
    const detailsJson = await detailsResponseObj.json();
    if (detailsResponseObj.ok) {
      console.log(`details JSON: ${JSON.stringify(detailsJson)}`);
      return detailsJson;
    } else {
      alert(`Error ${detailsResponseObj.status}: ${JSON.stringify(detailsJson.result)}`);
    }
  }

  function updateSelectedPokemonDetails(detailsJson) {
    //detail-img
    document.querySelector("#detail-img").src = detailsJson.imageUrl;
    //detail-dexNumber
    document.querySelector("#detail-dexNumber").innerText = detailsJson.dexNumber;
    //detail-name
    document.querySelector("#detail-name").innerText = detailsJson.name;
    //detail-types
    document.querySelector("#detail-types").innerText = detailsJson.types.toString();
    //detail-aboutName
    document.querySelector("#detail-aboutName").innerText = detailsJson.name;
    //detail-dexEntry
    document.querySelector("#detail-dexEntry").innerText = detailsJson.dexEntry;
    //add selected class to button
    addSelectedClassToButton(`${prefix_button}${detailsJson.dexNumber}`);
  }

  function removeAllButtonSelectedClass() {
    const allPokemonButtons = document.querySelectorAll(".btn-pokemon");
    console.log(`remove selected class count: ${allPokemonButtons.length}`);
    allPokemonButtons.forEach(function (item) {
      item.classList.remove("selected");
    });
  }

  function addSelectedClassToButton(buttonId) {
    //remove all buttons selected class
    removeAllButtonSelectedClass();
    //add selected class to button
    document.querySelector(`#${buttonId}`).classList.add("selected");
  }

});
