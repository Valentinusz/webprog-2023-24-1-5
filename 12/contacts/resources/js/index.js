const filterForm = document.querySelector('form#filter');
const filterForInput = filterForm.querySelector('input#name');
const contactsTable = document.querySelector('table#contacts');

filterForm.addEventListener('submit', async event=> {
    event.preventDefault();

    const response = await fetch(`ajax/filter_contacts.php?name=${filterForInput.value}`);

    console.log(response);

    if (!response.ok) {
        return;
    }

    contactsTable.innerHTML = await response.text();
})