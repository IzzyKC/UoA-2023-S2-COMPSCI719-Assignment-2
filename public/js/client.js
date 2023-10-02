window.addEventListener("load", function () {
  // TODO Add JavaScript code so that when the user clicks one of the Pokemon buttons,
  // detailed data about that Pokemon will be loaded from your own API, and displayed
  // in the appropriate place on the HTML page (overwriting any data which was already
  // there).
  //get all pokemon list buttons
  const btnPokemons = document.querySelectorAll(".btn-pokemon");
  const btnAddPoke = document.querySelector("#addPokemon");
  const prefix_button = "id-";

  //initialise page
  initialisePage();

  //add pokemon buttons click event
  for (let i = 0; i < btnPokemons.length; i++) {
    btnPokemons[i].addEventListener("click", function (event) {
      const dexNumber = btnPokemons[i].value;
      console.log(`selected pokemon dexNumber: ${dexNumber}`);
      setUpDetailsByDexNumber(dexNumber);
    });
  }

  btnAddPoke.addEventListener("click", function (event) {
    const newDexNumber = document.querySelector("#txtDexNumber").value;
    console.log(newDexNumber);
    if (validNewDexNumber(newDexNumber)) {
      addNewPokeFromAPI(newDexNumber);
    }
  });

  function initialisePage() {
    const selectedDexNumber = document.querySelector("#detail-dexNumber").innerText;
    //add selected class to selected pokemon button
    addSelectedClassToButton(`${prefix_button}${selectedDexNumber}`);
  }

  function validNewDexNumber(strDexNumber) {
    const intDexNumber = parseInt(strDexNumber);
    const errMsg = document.querySelector("#errMsg");
    //clear error messaeg
    errMsg.innerText = "";
    if(Number.isNaN(intDexNumber) || strDexNumber.indexOf(".") >= 0){
      errMsg.innerText = "Invalid input! Please enter a valid dexNumber from Interger 1 to 1010!";
      return false;
    }else if(intDexNumber < 1 || intDexNumber > 1010){
      errMsg.innerText = "Out of range! Please enter a valid dexNumber from Interger 1 to 1010!";
      return false;
    }else {
      const repeatPokemon = document.querySelector(`#${prefix_button}${strDexNumber}`);
      if (repeatPokemon) {
        errMsg.innerText = `#${strDexNumber} already exist! Please try again!`;
        return false;
      }
    }
    return true;
  }

  function addNewPokeFromAPI(dexNumber) {
    alert("addNewPokeFromAPI");
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
    btnPokemons.forEach(function (item) {
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
