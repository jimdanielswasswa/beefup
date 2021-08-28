const service_item_form = document.querySelector('#service-item-form');
const service_item_modal_heading = document.querySelector('#service-item-modal-heading');
const add_button = document.querySelector('#add-service-item');
const edit_buttons = document.querySelectorAll('.edit-btn');
const delete_buttons = document.querySelectorAll('.delete-btn');
const form_error_control = document.querySelector('#error-span');

add_button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    load_service_item_form(undefined);
});
service_item_form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        e.stopPropagation();
        const url = `/service-items/`;
        const method = service_item_form['save-btn'].dataset.action;
        const data = new FormData(service_item_form);
        await submit_form_data({ url: url + (`${(method === 'PATCH') ? service_item_form["service-item-id"].value : '' }`), method, data });        
        window.location.href = url;
    } catch (response) {
        form_error_control.innerText = '';
        response.errors.forEach((e) => {
            form_error_control.innerText += `${e} \n`;
        });
    }
});
edit_buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const dataset = e.target.dataset;
        load_service_item_form({ id: dataset.id, itemname: dataset.itemname, description: dataset.description, price: dataset.price });
    });
});
delete_buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        send_request({ url: `/service-items/${e.target.dataset.id}`, method: 'DELETE' })
            .then((response) => {
                window.location.href = '/service-items/';
            })
            .catch((error) => console.error(error));
    });
});
const load_service_item_form = (service_item) => {
    debugger
    if (service_item) {
        service_item_modal_heading.innerHTML = 'Edit service Item';
        service_item_form['service-item-id'].value = service_item.id;
        service_item_form['itemname'].value = service_item.itemname;
        service_item_form['description'].value = service_item.description;
        service_item_form['price'].value = service_item.price;
        if (service_item_form['service-image'].attributes.getNamedItem('required')) {
            service_item_form['service-image'].attributes.removeNamedItem('required');
        }
        service_item_form["save-btn"].dataset.action = 'PATCH';
    } else {
        clear_service_item_form();
        service_item_form["save-btn"].dataset.action = 'POST';
        service_item_modal_heading.innerHTML = 'Add A New service Item';
    }
    window.location.href = '#service-item-modal';
};
const clear_service_item_form = () => {
    service_item_form['service-item-id'].value = '';
    service_item_form['description'].value = '';
    service_item_form['price'].value = '';
}