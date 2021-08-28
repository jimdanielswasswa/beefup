const menu_item_form = document.querySelector('#menu-item-form');
const menu_item_modal_heading = document.querySelector('#menu-item-modal-heading');
const add_button = document.querySelector('#add-menu-item');
const edit_buttons = document.querySelectorAll('.edit-btn');
const delete_buttons = document.querySelectorAll('.delete-btn');
const form_error_control = document.querySelector('#error-span');

add_button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    load_menu_item_form(undefined);
});
edit_buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const dataset = e.target.dataset;
        load_menu_item_form({ id: dataset.id, itemname: dataset.itemname, description: dataset.description, price: dataset.price });
    });
});
menu_item_form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        e.stopPropagation();
        debugger
        const url = `/menu-items/`;
        const method = menu_item_form["save-btn"].dataset.action;
        const data = new FormData(menu_item_form);
        await submit_form_data({ url: (url + menu_item_form['menu-item-id'].value), method, data });
        window.location.href = url;
    } catch (response) {
        form_error_control.innerHTML = '';
        response.errors.forEach((e) => {
            form_error_control.innerHTML += `${e}\n`;
        });
    }
});
delete_buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        send_request({ url: `/menu-items/${e.target.dataset.id}`, method: 'DELETE' })
            .then((response) => {
                window.location.href = '/menu-items/';
            })
            .catch((error) => console.error(error));
    });
});
const load_menu_item_form = (menu_item) => {
    if (menu_item) {
        menu_item_modal_heading.innerHTML = 'Edit Menu Item';
        menu_item_form['menu-item-id'].value = menu_item.id;
        menu_item_form['itemname'].value = menu_item.itemname;
        menu_item_form['description'].value = menu_item.description;
        menu_item_form['price'].value = menu_item.price;
        if (menu_item_form['menuimage'].attributes.getNamedItem('required')) {
            menu_item_form['menuimage'].attributes.removeNamedItem('required');
        }
        menu_item_form["save-btn"].dataset.action = 'PATCH';
    } else {
        clear_menu_item_form();
        menu_item_modal_heading.innerHTML = 'Add A New Menu Item';
        menu_item_form["save-btn"].dataset.action = 'POST';
    }
    window.location.href = '#menu-item-modal';
};
const clear_menu_item_form = () => {
    menu_item_form['menu-item-id'].value = '';
    menu_item_form['description'].value = '';
    menu_item_form['price'].value = '';
}