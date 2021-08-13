const page_content_form = document.querySelector('#page-content-form');
const page_content_modal_heading = document.querySelector('#page-content-modal-heading');
const add_button = document.querySelector('#add-page-content');
const edit_buttons = document.querySelectorAll('.edit-btn');
const delete_buttons = document.querySelectorAll('.delete-gallery-image');

add_button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    load_page_content_form(undefined);
});
edit_buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const dataset = e.target.dataset;
        load_page_content_form({ id: dataset.id, pagename: dataset.pagename });
    });
});
delete_buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        debugger
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        send_request({ url: `/page-content/${e.target.dataset.id}`, method: 'DELETE' })
        .then((response) => {
            window.location.href = '/page-content/';
            // page_success.innerText = response.message;
        })
        .catch((error) => /*page_error.innerText = error*/ console.error(error));
    });
});
const load_page_content_form = (page_content) => {
    debugger
    // if(page_content){
    //     page_content_modal_heading.innerText = 'Edit Gallery Content';
    //     page_content_form['pagename'].value = page_content.pagename;
    //     page_content_form.attributes.getNamedItem('action').value = `/page-content/${page_content.id}`;
    // } else {
    //     clear_page_content_form();
    //     page_content_modal_heading.innerText = 'Add Gallery Content';
    //     page_content_form.attributes.getNamedItem('action').value = '/page-content/';
    // }    
    window.location.href = '#page-content-modal';
};
const clear_page_content_form = () => {
    // page_content_form['pagename'].value = '';
};