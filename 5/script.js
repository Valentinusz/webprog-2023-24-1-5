import {PixelArtApp} from "./PixelArtApp.js";

const pixelArts = [
     {id: 1, canvas: [['#FFF', '#000' ,'#FFF'], ['#FFF', '#000' ,'#FFF'], ['#000', '#000' ,'#000']]},
     {id: 2, canvas: [['#000', '#000' ,'#000'], ['#FFF', '#000' ,'#FFF'], ['#FFF', '#000' ,'#FFF']]},
     {id: 3, canvas: [['#000', '#000' ,'#000'], ['#FFF', '#FFF' ,'#FFF'], ['#FFF', '#000' ,'#FFF']]}
];

document.querySelector('#app').appendChild(PixelArtApp());