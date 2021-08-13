const add_button = document.querySelector('#add-user');
const edit_buttons = document.querySelectorAll('.edit-btn');
const delete_buttons = document.querySelectorAll('.delete-btn');
const user_form = document.querySelector('#user-form');
const user_modal_heading = document.querySelector('#user-modal-heading');
const page_success = document.querySelector('#page-success');
const page_error = document.querySelector('#page-error');
const form_error_control = document.querySelector('#error-span');

add_button.addEventListener('click', (e) => {
    debugger
    e.preventDefault();
    e.stopPropagation();
    load_user_form(undefined);
});

edit_buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        debugger
        const dataset = e.target.dataset;
        load_user_form({ id: dataset.id, username: dataset.username, email: dataset.email, isadmin: dataset.isadmin });
    });
});

delete_buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const dataset = e.target.dataset;
        send_request({ url: `/users/${dataset.id}`, method: 'DELETE' })
            .then((response) => {
                window.location.href = '/users/';
                page_success.innerText = response.message;
            })
            .catch((error) => page_error.innerText = error);
    });
});

// user_form.addEventListener('submit', (e) => {
//     debugger
//     e.preventDefault();
//     e.stopPropagation();
//     const u_form = e.target;
//     const user_id = user_form["user_id"].value;
//     const username = user_form["username"].value;
//     const email = user_form["email"].value;
//     const is_admin = user_form["isadmin"].checked;
//     const password = user_form["password"].value;
//     const confirm_password = user_form["confirm_password"].value;
//     const action_type = user_form["submit"].dataset.action;

//     if (action_type == 'CREATE') {
//         submit_data({ url: '/users/', method: 'POST', data: { username, email, password, confirm_password, isadmin: is_admin } })
//             .then((response) => {
//                 window.location.href = '/users/';
//                 page_success.innerText = response.message;
//             })
//             .catch((error) => form_error_control.innerText = error);

//     } else if (action_type == 'UPDATE') {
//         submit_data({ url: `/users/${user_id}`, method: 'PATCH', data: { username, email, password, confirm_password, isadmin: is_admin } })
//             .then((response) => {
//                 window.location.href = '/users/';
//                 page_success.innerText = response.message;
//             })
//             .catch((error) => form_error_control.innerText = error);
//     }
// });

const load_user_form = (user) => {
    if (user) {
        user_modal_heading.innerText = 'Edit User';
        user_form["user_id"].value = user.id;
        user_form["username"].value = user.username;
        user_form["email"].value = user.email;
        user_form["isadmin"].checked = user.isadmin === 'true';
        if (user_form["password"].attributes.getNamedItem('required')) {
            user_form["password"].attributes.removeNamedItem('required');
        }
        if (user_form["confirm_password"].attributes.getNamedItem('required')) {
            user_form["confirm_password"].attributes.removeNamedItem('required');
        }
        // user_form["submit"].dataset.action = 'UPDATE';
        user_form.attributes.getNamedItem('action').value = `/users/${user.id}`;
        // user_form.attributes.getNamedItem('method').value = 'PATCH';
        // user_form["_method"].value = 'PATCH';
    } else {
        clear_user_form();
        // user_form["submit"].dataset.action = 'CREATE';    
        user_modal_heading.innerText = 'Add New User';
        user_form.attributes.getNamedItem('action').value = `/users/`;
        user_form.attributes.getNamedItem('method').value = 'POST';
    }    
    window.location.href = "#user-modal";
};

// const submit_data = ({ url, method, data }) => new Promise((resolve, reject) => {
//     debugger
//     const request = new XMLHttpRequest();
//     request.onload = () => {
//         debugger
//         const response = JSON.parse(request.response);
//         if (response.message) {
//             resolve(response);
//         } else {
//             reject(response.error);
//         }
//     };
//     request.onerror = () => {
//         reject(request.response);
//     }
//     request.open(method, url, true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send(JSON.stringify(data));
// });
const clear_user_form = () => {
    user_form["username"].value = '';
    user_form["email"].value = '';
    user_form["password"].value = '';
    user_form["confirm_password"].value = '';
    user_form["isadmin"].checked = false;
};