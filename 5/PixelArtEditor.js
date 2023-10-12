/**
 * Creates the inner content of a grid table as a string.
 * @param grid grid to create show.
 * @returns {string} string ready to be set as innerHTML of a table.
 */
export const generateGridContent = (grid) => grid.map(
    row => `<tr>${row.map(cell => `<td style="background-color: ${cell}"></td>`).join(" ")}</tr>`
).join("");

/**
 *
 * @param width {?number|undefined}
 * @param height {?number|undefined}
 * @param initialGrid {?string[][]|undefined}
 * @param handleSave {function}
 * @return {HTMLDivElement}
 */
export function PixelArtEditor({width, height, initialGrid, handleSave}) {
    // állapottér
    let primaryColor = '#FF0000'
    let secondaryColor = '#FFFFFF';
    const grid = initialGrid ?? Array.from({length: height}).map(() => Array.from({length: width}).fill(secondaryColor));
    const colors = Array.from({length: 10}).fill('#FFFFFF');
    let continuouslyDrawing = false;

    // állapotátmenetek
    const draw = (row, column, color) => grid[row][column] = color;

    const pickColor = (newColor) => {
        colors.pop();
        colors.unshift(newColor);

        return primaryColor = newColor;
    }

    // eseménykezelők
    const handleClick = (event, isDrawing) => {
        if (event.target.matches('td')) {
            const row = event.target.parentElement.rowIndex;
            const column = event.target.cellIndex;

            event.target.style.backgroundColor = draw(row, column, isDrawing ? primaryColor : secondaryColor);
        }
    }

    // felület

    const parentDiv = document.createElement('div');
    parentDiv.classList.add('editor');

    const menuBar = document.createElement('div');
    menuBar.classList.add('menubar');
    parentDiv.appendChild(menuBar);

    const colorInput = Object.assign(document.createElement('input'), {type: 'color'});
    menuBar.appendChild(colorInput);

    colorInput.addEventListener('change', event => {
        pickColor(event.target.value);
        colorList.innerHTML = generateColorListContent(colors);
    });

    const generateColorListContent = (colors) => colors.map((color, index) =>
        `<li data-index="${index}" style="background-color: ${color}"></li>`
    ).join("");

    const colorList = document.createElement('ol');
    colorList.classList.add('colors')
    colorList.innerHTML = generateColorListContent(colors);
    menuBar.appendChild(colorList);

    colorList.addEventListener('click', event => {
        if (event.target.matches('li')) {
            console.log(colors)
            colorInput.value = pickColor(colors[event.target.dataset.index]);
        }
    })

    // assign az első paraméterként megadott objektumhoz hozzáadja a másik objektumban szereplő összes kulcs-érték párt
    const saveButton = Object.assign(document.createElement('button'), {innerHTML: "Mentés"});
    saveButton.addEventListener('click', () => handleSave(grid))
    menuBar.appendChild(saveButton);

    const gridTable = document.createElement('table');
    gridTable.classList.add('edit');
    gridTable.innerHTML = generateGridContent(grid);
    parentDiv.appendChild(gridTable)

    gridTable.addEventListener('click', event => handleClick(event, true));

    gridTable.addEventListener('contextmenu', event => {
        event.preventDefault();
        handleClick(event, false);
    });

    // folyamatos rajzolás
    gridTable.addEventListener('mousedown',  () => continuouslyDrawing = true);
    gridTable.addEventListener('mouseup', ()=> continuouslyDrawing = false);
    gridTable.addEventListener('mouseover', event => {
        if (continuouslyDrawing && event.target.matches('td')) {
            handleClick(event, primaryColor);
        }
    });
    gridTable.addEventListener('mouseleave', () => continuouslyDrawing = false);

    return parentDiv;
}