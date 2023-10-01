window.addEventListener("load", function () {
  // TODO Add JavaScript code so that when the user clicks one of the Pokemon buttons,
  // detailed data about that Pokemon will be loaded from your own API, and displayed
  // in the appropriate place on the HTML page (overwriting any data which was already
  // there).
  //get all pokemon list buttons
  const btnPokemons = document.querySelectorAll(".btn-pokemon");
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

  function initialisePage() {
    const selectedDexNumber = document.querySelector("#detail-dexNumber").innerText;
    //add selected class to selected pokemon button
    addSelectedClassToButton(`${prefix_button}${selectedDexNumber}`);
  }

  async function setUpDetailsByDexNumber(dexNumber) {
    const detailsJson = await fetchDetailsByDexNumber(dexNumber);
    //update details div
    if(detailsJson){
      updateSelectedPokemonDetails(detailsJson);
    }
  }

  async function fetchDetailsByDexNumber(dexNumber) {
    const detailsResponseObj = await fetch(`./api/pokemon/${dexNumber}`);
    const detailsJson = await detailsResponseObj.json();
    if(detailsResponseObj.ok){
      console.log(`details JSON: ${JSON.stringify(detailsJson)}`);
      return detailsJson;
    }else{
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

  function removeAllButtonSelectedClass(){
    btnPokemons.forEach(function(item){
      item.classList.remove("selected");
    });
  }

  function addSelectedClassToButton(buttonId){
    //remove all buttons selected class
    removeAllButtonSelectedClass();
    //add selected class to button
    document.querySelector(`#${buttonId}`).classList.add("selected");
  }

});
