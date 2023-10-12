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
    console.table(grid)

    const draw = (row, column, color) => grid[row][column] = color;

    draw(0, 0, primaryColor);

    const gridTable = document.createElement('table');
    gridTable.classList.add('edit');

    gridTable.innerHTML = grid.map(
        row => `<tr>${row.map(cell => `<td style="background-color: ${cell}"></td>`).join(" ")}</tr>`
    ).join("");

    const handleClick = (event, isDrawing) => {
        if (event.target.matches('td')) {
            const row = event.target.parentElement.rowIndex;
            const column = event.target.cellIndex;

            event.target.style.backgroundColor = draw(row, column, isDrawing ? primaryColor : secondaryColor);
        }
    }

    gridTable.addEventListener('click', event => handleClick(event, true))

    gridTable.addEventListener('contextmenu', event => {
        event.preventDefault();
        handleClick(event, false);
    })

    // for (let i = 0; i < height; i++) {
    //     const tr = document.createElement('tr');
    //     for (let j = 0; j < width; j++) {
    //         tr.appendChild(document.createElement('td'));
    //     }
    //     gridTable.appendChild(tr);
    // }

    return gridTable;
}