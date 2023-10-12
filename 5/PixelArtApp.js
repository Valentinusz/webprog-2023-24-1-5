import {generateGridContent, PixelArtEditor} from "./PixelArtEditor.js";


export function PixelArtApp() {
    const pixelArts = [
        {id: 1, canvas: [['#FFF', '#000' ,'#FFF'], ['#FFF', '#000' ,'#FFF'], ['#000', '#000' ,'#000']]},
        {id: 2, canvas: [['#000', '#000' ,'#000'], ['#FFF', '#000' ,'#FFF'], ['#FFF', '#000' ,'#FFF']]},
        {id: 3, canvas: [['#000', '#000' ,'#000'], ['#FFF', '#FFF' ,'#FFF'], ['#FFF', '#000' ,'#FFF']]}
    ];

    const width = 10;
    const height = 12;

    const div = document.createElement('div');


    const gallery = document.createElement('ol');
    gallery.classList.add('list');

    gallery.innerHTML = pixelArts.map(pixelArt => `<li data-id="${pixelArt.id}"><table class="preview">${generateGridContent(pixelArt.canvas)}</table></li>`).join(" ")
    div.appendChild(gallery);

    gallery.addEventListener('click', event => {
        const targetElement = event.target.closest('li');

        if (gallery.contains(targetElement)) {
            div.children[1].remove();
            div.children[1].remove();

            const selectedArt = pixelArts.find(({id}) => id == targetElement.dataset.id);

            PixelArtEditor({initialGrid: selectedArt.canvas}).forEach(element => {
                console.log(element)
                div.appendChild(element);
            })
        }
    })

    PixelArtEditor({width, height: height}).forEach(element => {
        div.appendChild(element);
    })



    return div;
}