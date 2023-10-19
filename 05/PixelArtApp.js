import {generateGridContent, PixelArtEditor} from "./PixelArtEditor.js";
import {PixelArtForm} from './PixelArtForm.js';

/**
 * Creates the inner content of the pixel arts list.
 * @param arts arts to show.
 * @returns {string} string ready to be set as innerHTML property of a list element.
 */
export const makeGalleryContent = (arts) => arts.map(
    art => `<li data-id="${art.id}"><table class="preview">${generateGridContent(art.canvas)}</table></li>`
).join(" ");

/**
 * App for drawing pixel arts.
 * @returns {HTMLElement} modules html element containing all elements needed by the app.
 */
export function PixelArtApp() {
    // állapottér
    // az alkalmazás működtetéséhez szükséges adatok
    // érdemes az alkalmazást egy állapotgépként felfogni
    const pixelArts = JSON.parse(localStorage.getItem('arts')) ?? [];

    let selectedArt = undefined;

    // állapotátmenetek
    // az adatok frissítésért felelős műveletekek
    // az eseménykezelő függvények hívják meg őket
    const createNewGrid = () => {
        selectedArt = undefined;
    }

    const loadArt = id => selectedArt = pixelArts.find((art) => art.id === id);

    const saveArt = grid => {
        if (selectedArt) {
            selectedArt.grid = grid;
        } else {
            selectedArt = {id: pixelArts.length + 1, canvas: grid};
            pixelArts.push(selectedArt);
        }
        localStorage.setItem('arts', JSON.stringify(pixelArts))
    }
    // ha jobban el szeretnénk választani, akkor érdemes az állapotot és az állapotátmeneteket külön szervezni

    // eseménykezelők
    const handleCreateButtonClick = (width, height) => {
        createNewGrid();
        div.querySelector('.editor')?.remove();
        div.appendChild(PixelArtEditor({width, height, handleSave: handleSaveButtonClick}))
    }

    const handleGalleryClick = event => {
        const targetElement = event.target.closest('li');

        if (gallery.contains(targetElement)) {
            div.querySelector('.editor')?.remove();

            const selectedArt = loadArt(Number.parseInt(targetElement.dataset.id, 10));
            div.appendChild(PixelArtEditor({initialGrid: selectedArt.canvas, handleSave: handleSaveButtonClick}));
        }
    }

    const handleSaveButtonClick = grid => {
        saveArt(grid);
        gallery.innerHTML = makeGalleryContent(pixelArts);
    }

    // felület
    // a fületet és az adat közt az eseménykezelő függvények teremtenek kapcsolatot
    // állapotátmeneti függvényeket hívnak
    // az új állapot alapján frissítik a felületet, ehhez két megközelítés van
    //   imperatív - specifikusan frissítem a felületet ahol kell (hatékony)
    //   deklaratív - a felületem egy részét felülírom egy újonnan előállított felületrészlettel (kényelmes)
    // helyes megoldás valahol a kettő között van, de ez nem ennek a tárgynak a témája
    const div = document.createElement('div');
    div.appendChild(PixelArtForm({min: 5, max: 100, handleSubmit: handleCreateButtonClick}));

    const gallery = document.createElement('ol');
    gallery.classList.add('list');
    gallery.innerHTML = makeGalleryContent(pixelArts);
    gallery.addEventListener('click', handleGalleryClick);
    div.appendChild(gallery);

    return div;
}
