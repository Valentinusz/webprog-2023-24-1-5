const request = new XMLHttpRequest();

// inicializálás
request.open("GET", "https://pokeapi.co/api/v2/pokemon/ditto");

// válasz formátum megadása
request.responseType = "json"; // "" | "arraybuffer" | "blob" | "document" | "json" | "text"

// "load" esemény kérés válasz megérkezett
// "error" kérés során hiba
// "abort" kérés elvetve
request.addEventListener("load", event => {
    console.log(event.target.response);
});

// kérés elküldése
request.send();








