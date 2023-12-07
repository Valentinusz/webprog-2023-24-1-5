const takenUserNameErrorMessage = document.querySelector('span#taken')
const usernameInput = document.querySelector('input#username');

usernameInput.addEventListener('focusout', async () => {
    const response = await fetch(`ajax/is_username_taken.php?id=${usernameInput.value}`);

    if (response.ok) {
        const data = await response.json();

        takenUserNameErrorMessage.hidden = !data.in_use
    }
})
