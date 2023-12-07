// készítsünk egy oldalt ami lekérdezi a pokeapi.co oldalról a felhasználó által egy mezőben megadott pokemon hol
// található meg!

const pokemonForm = document.querySelector('form#pokemon');
const pokemonNameInput = pokemonForm.querySelector('input#name');
const locationList = document.querySelector('ul#locations');

pokemonForm.addEventListener('submit', async event => {
    event.preventDefault();

    if (pokemonNameInput.value.trim() === '') {
        return;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameInput.value}`);

    console.log(response);

    if (!response.ok) {
        locationList.innerHTML = "";
        return;
    }

    const data = await response.json();

    const locationResponse = await fetch(data.location_area_encounters)

    if (!locationResponse.ok) {
        locationList.innerHTML = "";
        return;
    }

    console.log(locationResponse);

    const locationData = await locationResponse.json();

    locationList.innerHTML = locationData.map(l => `<li>${l.location_area.name}</li>`).join(" ")
    console.log(locationData);
})