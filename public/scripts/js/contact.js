const contact_form = document.querySelector('#contact-form');
contact_form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
        from: contact_form["from"].value,
        email: contact_form["email"].value,
        phonenumber: contact_form["phonenumber"].value,
        message: contact_form["message"].value
    };
    submit_data({ url: `/contact/`, method: 'POST', data }).then((response) => {
        window.location.href = window.location.href.substring(0, (window.location.href.indexOf('#')));
    }).catch((e) => {
        alert(e);
    });
});

const load_contact_form = (id, reservationdatetime) => {
    contact_form["from"].value = '';
    contact_form["email"].value = '';
    contact_form["phonenumber"].value = '';
    contact_form["message"].value = '';
    window.location.href = '#contact-modal';
};