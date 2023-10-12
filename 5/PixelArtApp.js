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
    const pixelArts = [
        {id: 1, canvas: [['#FFF', '#000' ,'#FFF'], ['#FFF', '#000' ,'#FFF'], ['#000', '#000' ,'#000']]},
        {id: 2, canvas: [['#000', '#000' ,'#000'], ['#FFF', '#000' ,'#FFF'], ['#FFF', '#000' ,'#FFF']]},
        {id: 3, canvas: [['#000', '#000' ,'#000'], ['#FFF', '#FFF' ,'#FFF'], ['#FFF', '#000' ,'#FFF']]}
    ];

    let selectedArt = undefined;

    // állapotátmenetek
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
    }

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
    const div = document.createElement('div');
    div.appendChild(PixelArtForm({min: 5, max: 100, handleSubmit: handleCreateButtonClick}));

    const gallery = document.createElement('ol');
    gallery.classList.add('list');
    gallery.innerHTML = makeGalleryContent(pixelArts);
    gallery.addEventListener('click', handleGalleryClick);
    div.appendChild(gallery);

    return div;
}