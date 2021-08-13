const menu_item_form = document.querySelector('#menu-item-form');
const menu_item_modal_heading = document.querySelector('#menu-item-modal-heading');
const add_button = document.querySelector('#add-menu-item');
const edit_buttons = document.querySelectorAll('.edit-btn');
const delete_buttons = document.querySelectorAll('.delete-btn');

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
delete_buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => { 
        send_request({ url: `/menu-items/${e.target.dataset.id}`, method: 'DELETE'})
        .then((response) => {
            window.location.href = '/menu-items/';
            // page_success.innerText = response.message;
        })
        .catch((error) => /*page_error.innerText = error*/ console.error(error));
     });
});
const load_menu_item_form = (menu_item) => {
    if (menu_item) {
        menu_item_modal_heading.innerHTML = 'Edit Menu Item';
        menu_item_form['menu-item-id'].value = menu_item.id;
        menu_item_form['itemname'].value = menu_item.itemname;
        menu_item_form['description'].value = menu_item.description;
        menu_item_form['price'].value = menu_item.price;
        if(menu_item_form['menu-image'].attributes.getNamedItem('required')){
            menu_item_form['menu-image'].attributes.removeNamedItem('required');
        }
        menu_item_form.attributes.getNamedItem('action').value = `/menu-items/${menu_item.id}`;
    } else {
        clear_menu_item_form();
        menu_item_modal_heading.innerHTML = 'Add A New Menu Item';
    }
    window.location.href = '#menu-item-modal';
};
const clear_menu_item_form = () => {
    menu_item_form['menu-item-id'].value = '';
    menu_item_form['description'].value = '';
    menu_item_form['price'].value = '';
}