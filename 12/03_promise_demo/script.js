const a = 6;

const promise = new Promise((resolve, reject) => {
    // művelet szimulálás
    setTimeout(() => {
        const b = a / 2;

        // másik művelet szimulálás
        setTimeout(() => {
            const c = a + b;

            // harmadik művelet szimulálás
            setTimeout(() => {
                if (Number.isInteger(c)) {
                    resolve(a + b);
                } else {
                    reject("a nem oszható kettővel.")
                }
            }, 2000)
        }, 2000)
    }, 2000)
});

// promise - ígéret,
// "nem tudom mikor fogom ezt az azinkron műveletet befejezni, de ha befejeztem ebbe a tárolóba rakom majd az értéket
// és arról hogy elkészült hagyok egy üzenetet a callback queue-ban"
console.log(promise);

// promise állapota lehet
// pending - folyamatban van
// fulfilled - befejeződött
// rejected - hiba történt

// az ígéretek try catch-hez hasonló módon bonthatóak ki
// then akkor fut le ha a promise fulfilled lett
// catch ha rejected lett
// finally then vagy catch lefutása után

promise.then(result => {
    console.log(result);
}).catch(reason => {
    console.log("Hiba történt: " + reason);
}).finally(() => {
    console.log("Ez mindig lefut.");
})