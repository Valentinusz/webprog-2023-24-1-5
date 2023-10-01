const temperature = [10,-20,12,0,1,23,-5, 30]

console.log(
    temperature.reduce((sum, curr) => sum + curr, 0) / temperature.length
);

console.log(
    temperature.filter(temp => temp > 26).length
);

console.log(
    temperature.reduce((max, curr) => (curr > max ? curr : max), -Infinity)
);

console.log(
    temperature.indexOf(temperature.reduce((min, curr) => (curr < min ? curr : min), Infinity)) + 1
);

console.log(
    temperature.indexOf(23) + 1
);

console.log(
    temperature.findIndex(temperature => temperature === 23) + 1
);

console.log(
    temperature.some((temp, index, array) => Math.abs(temp - array[index+1]))
);

console.log(
    temperature.reduce((acc, curr) => {
        if (curr > 25) {
            acc.currentLength++;
            if (acc.currentLength > acc.longest) {
                acc.longest = acc.currentLength;
            }
        } else {
            acc.currentLength = 0;
        }
        return acc;
    }, {currentLength: 0, longest: 0})?.longest
    // ?. csak akkor próbálj meg kiolvasni a longest attribútumot, ha az objektum nem undefined/null
);