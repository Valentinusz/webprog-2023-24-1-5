export const generateGridContent = (grid) => grid.map(
    row => `<tr>${row.map(cell => `<td style="background-color: ${cell}"></td>`).join(" ")}</tr>`
).join("");

/**
 *
 * @param width {?number|undefined}
 * @param length {?number|undefined}
 * @param initialGrid {?string[][]|undefined}
 */
export function PixelArtEditor({width, height, initialGrid}) {
    let primaryColor = '#FF0000'
    let secondaryColor = '#FFFFFF';
    const grid = initialGrid ?? Array.from({length: height}).map(() => Array.from({length: width}).fill(secondaryColor));
    const colors = Array.from({length: 10}).fill('#FFFFFF');

    const draw = (row, column, color) => grid[row][column] = color;

    const pickColor = (newColor) => {
        colors.pop();
        colors.unshift(newColor);

        return primaryColor = newColor;
    }

    const gridTable = document.createElement('table');
    gridTable.classList.add('edit');

    gridTable.innerHTML = generateGridContent(grid);

    const handleClick = (event, isDrawing) => {
        if (event.target.matches('td')) {
            const row = event.target.parentElement.rowIndex;
            const column = event.target.cellIndex;

            event.target.style.backgroundColor = draw(row, column, isDrawing ? primaryColor : secondaryColor);
        }
    }

    gridTable.addEventListener('click', event => handleClick(event, true));

    gridTable.addEventListener('contextmenu', event => {
        event.preventDefault();
        handleClick(event, false);
    });

    const menuBar = document.createElement('div');

    const colorInput = Object.assign(document.createElement('input'), {type: 'color'});
    menuBar.appendChild(colorInput);

    const generateColorListContent = (colors) => colors.map((color, index) => `<li data-index="${index}" style="background-color: ${color}"></li>`).join("");

    const colorList = document.createElement('ol');
    colorList.classList.add('colors')
    colorList.innerHTML = generateColorListContent(colors);

    colorList.addEventListener('click', event => {
        if (event.target.matches('li')) {
            console.log(colors)
            colorInput.value = pickColor(colors[event.target.dataset.index]);
        }
    })

    menuBar.appendChild(colorList);

    colorInput.addEventListener('change', event => {
        pickColor(event.target.value);
        colorList.innerHTML = generateColorListContent(colors);
    });

    return [menuBar, gridTable];
}

