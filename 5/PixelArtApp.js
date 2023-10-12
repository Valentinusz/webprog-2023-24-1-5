import {PixelArtEditor} from "./PixelArtEditor.js";

export function PixelArtApp() {
    const width = 10;
    const height = 12;

    const div = document.createElement('div');

    div.appendChild(PixelArtEditor({width, height: height}))

    return div;
}