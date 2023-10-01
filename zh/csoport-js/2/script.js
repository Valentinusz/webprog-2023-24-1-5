const typeSelect = document.querySelector('#game');
const selectButton = document.querySelector('#new');
const sizes = {5: {row: 10, col: 9}, 6: {row: 5, col: 9}, 7: {row: 5, col: 7}};

const table = document.querySelector('table');

let playedNumbers = [];
let type;

selectButton.addEventListener('click', () => {
    typeSelect.disabled = true;
    selectButton.disabled = true;

    type = Number.parseInt(typeSelect.value, 10);

    for (let i = 0; i < sizes[type].row; i++) {
        const tr = document.createElement('tr');
        for (let j = 1; j <= sizes[type].col; j++) {
            tr.innerHTML += `<td>${ i * sizes[type].col + j }</td>`
        }
        table.appendChild(tr);
    }
});

const tasksDiv = document.querySelector('#tasks');
let finished = false;

table.addEventListener('click', event => {
    if (event.target.matches('td')) {
        const tableCell = event.target;
        const tableCellNumber = Number.parseInt(tableCell.innerText, 10);

        if (playedNumbers.includes(tableCellNumber)) {
            playedNumbers = playedNumbers.filter(number => number !== tableCellNumber);
            tableCell.classList.remove('played');
        } else {
            if (!finished) {
                tableCell.classList.add('played')
                playedNumbers.push(tableCellNumber);
            }
        }

        finished = type === playedNumbers.length;

        if (finished) {
            tasksDiv.style.display = 'block';
        } else {
            tasksDiv.style.display = '';
        }
    }
})

const drawButton = tasksDiv.querySelector('#draw')
const task6 = tasksDiv.querySelector('#task6');
const task7 = tasksDiv.querySelector('#task7');
const task8 = tasksDiv.querySelector('#task8');
const task9 = tasksDiv.querySelector('#task9');

drawButton.addEventListener('click', () => {
    const draw = drawLottery(type);
    const winningNumbers = playedNumbers.filter(number => draw.includes(number)).length;

    task6.innerText = draw.join(', ');
    task7.innerText = winningNumbers;
    task8.innerText = draw.join('').split('').map(number => Number.parseInt(number, 10)).reduce((sum, current) => sum + current);
    task9.innerText = draw.some(number => draw.includes(number ** 2)) ? "Van" : "Nincs";
})

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}

function drawLottery(n){
    const limits = {5 : 90, 6 : 45, 7 : 35}
    if (!limits.hasOwnProperty(n)) return [];
    const limit = limits[n]
    let draw = []
    while (draw.length < n){
        let rand = Math.floor(Math.random() * limit) + 1
        if (!draw.includes(rand)) draw.push(rand)
    }
    return draw.sort((u, v) => u - v)
}
