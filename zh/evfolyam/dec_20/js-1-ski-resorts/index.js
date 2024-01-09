const task1 = document.querySelector("#task1");
const task2 = document.querySelector("#task2");
const task3 = document.querySelector("#task3");
const task4 = document.querySelector("#task4");
const task5 = document.querySelector("#task5");

// data
console.log(resorts);

// Tasks
// Adj meg egy várost, amely Svájcban vagy Franciaországban van, és a sípályáinak hossza több, mint 200km!
// keresés
task1.innerText = resorts.find(
    resort => (resort.country === "France" || resort.country === "Switzerland") && resort.skiSlopeLength > 200
)?.city;
// ?., csak akkor olvassa ki a mező értékét ha az objektum nem null/undefined



// Mely településeknek van 2000m alatti csúcsa? 
task2.innerText = resorts.filter(resort => resort.highestPoint < 2000) // kiválogatás
                         .map(resort => resort.city) // csak városnév
                         .join(", "); // összefűzés stringgé



// Melyik településnek van a leghosszabb sípálya-rendszere? 
// maximumkiválasztás
const longest = resorts.reduce(
    (max, current) => current.skiSlopeLength > max.skiSlopeLength ? current : max
);
// igazából a feladat nem kéri hogy így írjuk ki de a mintán ez van

task3.innerText = `${longest.city}, ${longest.skiSlopeLength}km`;



// Igaz, hogy mindegyik városban van legalább 40km hosszú pálya?
// eldöntés
// feladat írja, hogy a városok különbözők, ha ezt nem lehetne feltenni akkor minden városra szét kéne válogatni és a
// különb városra vonatkozó tömbökön some-al eldöntést végezni
task4.innerText = resorts.every(resort => resort.skiSlopeLength > 40);



// Add meg, minden országra, hogy hány város képviselteti magát a listában!
// sokféle moldon megolható például map-el

// js objektumok map-ként működnek:
const countryToCityCount = {};

resorts.forEach(resort => {
    // in: van-e ilyen kulcsa az objektumnak
    if (resort.country in countryToCityCount) {
        // objektumok mezőit így is el lehet érni
        countryToCityCount[resort.country]++;
    } else {
        countryToCityCount[resort.country] = 1;
    }
});

task5.innerText = Object.entries(countryToCityCount).map(entry => `(${entry[0]} ${entry[1]})`)
                                                    .join(", ")

// szebb megoldás dedikált map típus:
const countryToCityCountMap = new Map();

resorts.forEach(resort => {
    if (countryToCityCountMap.has(resort.country)) {
        countryToCityCountMap.set(resort.country, countryToCityCountMap.get(resort.country) + 1)
    } else {
        countryToCityCountMap.set(resort.country, 1)
    }
});

task5.innerText = [...countryToCityCountMap.entries()].map(entry => `(${entry[0]} ${entry[1]})`)
                                                      .join(", ")
