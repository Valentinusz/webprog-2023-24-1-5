// készítsünk egy oldalt ami lekérdezi a pokeapi.co oldalról a felhasználó által egy mezőben megadott pokemon hol
// található meg!

const pokemonForm = document.querySelector('form#pokemon');
const pokemonNameInput = pokemonForm.querySelector('input#name');
const locationList = document.querySelector('ul#locations');

pokemonForm.addEventListener('submit', event => {
    event.preventDefault();

    if (pokemonNameInput.value.trim() === '') {
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameInput.value}`).then(response => {
        console.log(response);

        if (response.ok) {
            response.json().then(data => {
                fetch(data.location_area_encounters).then(locationResponse => {
                    if (locationResponse.ok) {
                        console.log(locationResponse);

                        locationResponse.json().then(locationData => {
                            locationList.innerHTML = locationData.map(l => `<li>${l.location_area.name}</li>`).join(" ")
                            console.log(locationData);
                        })
                    }
                })
            })
        }
    })
})