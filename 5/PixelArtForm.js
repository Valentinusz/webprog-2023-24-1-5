/**
 * Constructs a form that consists of a height and a width input. The value inside the inputs are validated.
 *
 * @param minValue {number} minimum value of the input fields.
 * @param maxValue {!number} maximum value of the input fields.
 * @param handleSubmit {function} function to execute when the form is submitted.
 * @returns {HTMLFormElement} a form element.
 */
export function PixelArtForm({minValue = 0, maxValue= Infinity, handleSubmit}) {
    const form = document.createElement('form');

    /** @type {{width: ?number, height: ?number}} */
    const data = {width: undefined, height: undefined};

    form.innerHTML += '<label for="width">Szélesség</label>'
    const widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.name = 'width'
    form.appendChild(widthInput);

    form.innerHTML += '<label for="height">Magasság</label>'
    const heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.name = 'height'
    form.appendChild(heightInput);

    const button = document.createElement('button');
    button.innerText = 'Létrehozás';
    button.disabled = true;
    form.appendChild(button);

    const validate = data => Object.values(data).every(value => (minValue <= value && value <= maxValue));

    form.addEventListener('input', event => {
        data[event.target.name] = Number.parseInt(event.target.value, 10);
        button.disabled = !validate(data);
    })

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (validate(data)) {
            handleSubmit(data.width, data.height);
        }
    })

    return form;
}